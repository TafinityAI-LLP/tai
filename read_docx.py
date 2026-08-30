import xml.etree.ElementTree as ET
tree = ET.parse('e:/Devlopment/tai/temp_docx/word/document.xml')
with open('e:/Devlopment/tai/doc_content.txt', 'w', encoding='utf-8') as f:
    f.write('\n'.join(p.text for p in tree.iter() if p.text))
