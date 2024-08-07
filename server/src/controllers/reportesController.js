const ReporteModel = require('../models/reporteModel');
const XLSX = require('xlsx');
const PDFDocument = require('pdfkit');
const fs = require('fs');

async function obtenerReporteEstadoProyectosYActivos(req, res) {
    try {
        const reporte = await ReporteModel.obtenerEstadoProyectosYActivos();
        res.status(200).json(reporte);
    } catch (error) {
        res.status(500).json({ message: 'Error al generar el reporte: ' + error.message });
    }
}
  
async function obtenerReporteUtilizacionActivos(req, res) {
    try {
        const reporte = await ReporteModel.obtenerUtilizacionActivos();
        res.status(200).json(reporte);
    } catch (error) {
        res.status(500).json({ message: 'Error al generar el reporte: ' + error.message });
    }
}

async function exportarReporteExcel(req, res) {
  try {
    const reporte = await ReporteModel.obtenerEstadoProyectosYActivos();
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(reporte);
    XLSX.utils.book_append_sheet(workbook, worksheet, "Reporte");
    const buffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });
    
    res.setHeader('Content-Disposition', 'attachment; filename=reporte.xlsx');
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.send(buffer);
  } catch (error) {
    res.status(500).json({ message: 'Error al exportar el reporte a Excel: ' + error.message });
  }
}

async function exportarReportePDF(req, res) {
    try {
      const reporte = await ReporteModel.obtenerEstadoProyectosYActivos();
      const doc = new PDFDocument({ margin: 30 });
  
      res.setHeader('Content-Disposition', 'attachment; filename=reporte.pdf');
      res.setHeader('Content-Type', 'application/pdf');
  
      doc.pipe(res);
  
      
      doc.fontSize(18)
         .font('Helvetica-Bold')
         .fillColor('#333333')
         .text('Reporte de Estado de Proyectos y Utilización de Activos', {
           align: 'center',
           underline: true
         });
      doc.moveDown(2);
  
      
      reporte.forEach(proyecto => {
        doc.fontSize(14)
           .font('Helvetica-Bold')
           .fillColor('#000000')
           .text(`Proyecto: ${proyecto.ProyectoNombre}`, {
             underline: true
           });
        doc.moveDown(0.5);
  
        doc.fontSize(12)
           .font('Helvetica')
           .fillColor('#666666')
           .text(`Estado: ${proyecto.EstadoProyecto}`);
        doc.text(`Fecha Inicio: ${proyecto.Fecha_Inicio}`);
        doc.text(`Fecha Fin: ${proyecto.Fecha_Fin}`);
        doc.text(`Activos Asignados: ${proyecto.NumeroDeActivosAsignados}`);
  
        doc.moveDown(0.5);
  
        
        doc.fontSize(12)
           .font('Helvetica-Bold')
           .fillColor('#000000')
           .text('Detalle Activos:');
        doc.fontSize(10)
           .font('Helvetica')
           .fillColor('#333333')
           .text(`${proyecto.DetalleActivos}`);
  
        doc.moveDown(2);
      });
  
      doc.end();
    } catch (error) {
      res.status(500).json({ message: 'Error al exportar el reporte a PDF: ' + error.message });
    }
  }

module.exports = {
  obtenerReporteEstadoProyectosYActivos,
  obtenerReporteUtilizacionActivos,
  exportarReporteExcel,
  exportarReportePDF
};