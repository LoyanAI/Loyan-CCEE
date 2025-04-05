import fitz  # PyMuPDF
import os

def extract_text_and_images(pdf_path, output_folder):
    pdf_document = fitz.open(pdf_path)
    text_with_image_paths = ""
    for page_num in range(len(pdf_document)):
        page = pdf_document.load_page(page_num)
        text = page.get_text("text") 
        text_with_image_paths += text
        image_list = page.get_images(full=True)
        for img_index, img in enumerate(image_list):
            xref = img[0]
            base_image = pdf_document.extract_image(xref)
            image_bytes = base_image["image"]

            
            image_filename = f"image_page{page_num + 1}_{img_index + 1}."+base_image['ext']
            image_path = os.path.join(output_folder, image_filename)
            with open(image_path, "wb") as img_file:
                img_file.write(image_bytes)

            text_with_image_paths += f'<img src="{image_path}"></img>'

    pdf_document.close()
    return text_with_image_paths

pdf_file = "0.pdf" 
output_folder = "imgs"
os.makedirs(output_folder, exist_ok=True)

result_text = extract_text_and_images(pdf_file, output_folder)
f=open('0.txt','w',encoding="utf-8")
f.write(result_text)
f.close()