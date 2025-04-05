from PyPDF2 import PdfReader, PdfWriter

def merge_pdfs(paths, output):
    pdf_writer = PdfWriter()
    for path in paths:
        pdf_reader = PdfReader(path)
        for page in pdf_reader.pages:
            pdf_writer.add_page(page)
    with open(output, "wb") as out:
        pdf_writer.write(out)

pdf_paths = ["0-p.pdf", "1-p.pdf", "2-p.pdf","3-p.pdf","4-p.pdf"]
output_pdf = "Processed.pdf"
merge_pdfs(pdf_paths, output_pdf)
print(f"Merged PDF saved as {output_pdf}")