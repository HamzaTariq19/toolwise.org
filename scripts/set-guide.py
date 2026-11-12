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
faqs = re.sub(r'^(\s*-?\s*[qa]): (.*)$', lambda m: f'{m.group(1)}: ' + json.dumps(m.group(2).strip(), ensure_ascii=False) if not m.group(2).startswith('"') else m.group(0), faqs, flags=re.M)
open(path, 'w').write('---\n' + '\n'.join(keep) + '\n' + faqs.strip() + '\n---\n\n' + body.strip() + '\n')
