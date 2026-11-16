// Renders JSON-LD structured data. Safe: data is our own static objects.
//
// Everything a page passes becomes ONE @graph in ONE <script>, instead of a
// separate script per node. This used to emit six unconnected blocks on the
// homepage with no @id on any of them, so nothing told a crawler that the
// Organization and the ProfessionalService were the same Nodevant. @id does
// the connecting; a single graph is the arrangement that makes the ids
// legible, and doing it here fixes every page at once.
type Node = Record<string, unknown>;

export default function JsonLd({ data }: { data: object | object[] }) {
  const input = (Array.isArray(data) ? data : [data]) as Node[];

  // Flatten: a node that already carries its own @graph is spliced in rather
  // than nested, so the output is never a graph inside a graph.
  const nodes: Node[] = [];
  for (const item of input) {
    const inner = item?.["@graph"];
    if (Array.isArray(inner)) nodes.push(...(inner as Node[]));
    else if (item) nodes.push(item);
  }

  // @context is hoisted to the wrapper; it is "https://schema.org" on every
  // node this codebase produces, and repeating it per node is noise.
  const context =
    (nodes.find((n) => n["@context"])?.["@context"] as string) ??
    "https://schema.org";
  // Copy-then-delete rather than destructuring the key away: the
  // discarded binding trips no-unused-vars and fails the build.
  const graph = nodes.map((n) => {
    const copy: Node = { ...n };
    delete copy["@context"];
    return copy;
  });

  const payload =
    graph.length === 1
      ? { "@context": context, ...graph[0] }
      : { "@context": context, "@graph": graph };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(payload) }}
    />
  );
}
