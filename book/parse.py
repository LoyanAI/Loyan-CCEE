import fitz  # PyMuPDF
import os
 
def extract_images_from_pdf(pdf_path, output_folder):
 
    doc = fitz.open(pdf_path)
    if not os.path.exists(output_folder):
        os.makedirs(output_folder)
    for page_number in range(len(doc)):
        page = doc[page_number]
        images = page.get_images(full=True)
        for index, img in enumerate(images):
            xref = img[0]
            base_image = doc.extract_image(xref)
            image_bytes = base_image["image"]
            image_ext = base_image["ext"]
            
            image_filename = f"page{page_number + 1}_image{index + 1}.{image_ext}"
            image_path = os.path.join(output_folder, image_filename)
            
            with open(image_path, "wb") as img_file:
                img_file.write(image_bytes)
                print(f"Saved: {image_path}")
    
    doc.close()

pdf_path = '0.pdf'
output_folder = 'imgs'
extract_images_from_pdf(pdf_path, output_folder)