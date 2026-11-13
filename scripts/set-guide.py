# Replace a guide's FAQs and body but keep its seoTitle and metaDescription.
# Usage: python3 scripts/set-guide.py <slug> < new.md   (new.md = "faqs:" YAML block, a line "---", then the Markdown body)
import sys, re
slug = sys.argv[1]; path = f'src/content/tools/{slug}.md'
old = open(path).read(); new = sys.stdin.read()
fm = re.match(r'---\n(.*?)\n---\n', old, re.S).group(1)
keep = [l for l in fm.split('\n') if l.startswith(('seoTitle:', 'metaDescription:'))]
faqs, body = new.split('\n---\n', 1)
# Quote every FAQ question and answer so colons and quotes inside them are safe in YAML
import json
def _is_json_str(v):
    try: return isinstance(json.loads(v), str)
    except Exception: return False
faqs = re.sub(r'^(\s*-?\s*[qa]): (.*)$', lambda m: f'{m.group(1)}: ' + (m.group(2).strip() if _is_json_str(m.group(2).strip()) else json.dumps(m.group(2).strip(), ensure_ascii=False)), faqs, flags=re.M)
open(path, 'w').write('---\n' + '\n'.join(keep) + '\n' + faqs.strip() + '\n---\n\n' + body.strip() + '\n')
