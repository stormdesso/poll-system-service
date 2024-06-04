import document from "../Img/file-icon/document.png"
import excelFile from "../Img/file-icon/excel-file.png"
import otherFile from "../Img/file-icon/other-file.png"
import pdfFile from "../Img/file-icon/pdf-file.png"
import powerPoint from "../Img/file-icon/powerPoint-file.png"



export const FilePictogramm = {
    "doc": document,
    "docx": document,
    "xlsx": excelFile,
    "xlsm": excelFile,
    "pdf": pdfFile,
    "pptx": powerPoint,
    "other": otherFile,
};

export function GetFileIcon(key) {
    return FilePictogramm[key] || FilePictogramm["other"];
}