import os
from reportlab.lib.pagesizes import letter
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib import colors

def generate_pdf():
    pdf_path = "assets/cv_alexandros_aristidou.pdf"
    
    # 0.75 inch margins
    doc = SimpleDocTemplate(
        pdf_path,
        pagesize=letter,
        rightMargin=54,
        leftMargin=54,
        topMargin=54,
        bottomMargin=54
    )
    
    styles = getSampleStyleSheet()
    
    # Custom styles
    title_style = ParagraphStyle(
        'CVTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=22,
        leading=26,
        textColor=colors.HexColor('#14533a'),
        alignment=1, # Center
        spaceAfter=6
    )
    
    subtitle_style = ParagraphStyle(
        'CVSubtitle',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=10,
        leading=14,
        textColor=colors.HexColor('#4a5568'),
        alignment=1, # Center
        spaceAfter=15
    )
    
    section_heading = ParagraphStyle(
        'CVSectionHeading',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=12,
        leading=16,
        textColor=colors.HexColor('#14533a'),
        spaceBefore=12,
        spaceAfter=4,
        keepWithNext=True
    )
    
    item_header = ParagraphStyle(
        'CVItemHeader',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=10,
        leading=14,
        textColor=colors.HexColor('#2d3748'),
        spaceBefore=4,
        spaceAfter=2,
        keepWithNext=True
    )
    
    item_subheader = ParagraphStyle(
        'CVItemSubheader',
        parent=styles['Normal'],
        fontName='Helvetica-Oblique',
        fontSize=9.5,
        leading=13,
        textColor=colors.HexColor('#4a5568'),
        spaceAfter=2,
        keepWithNext=True
    )
    
    body_style = ParagraphStyle(
        'CVBody',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9.5,
        leading=13,
        textColor=colors.HexColor('#2d3748'),
        leftIndent=15,
        spaceAfter=2
    )

    skills_body_style = ParagraphStyle(
        'CVSkillsBody',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9.5,
        leading=13.5,
        textColor=colors.HexColor('#2d3748'),
        spaceAfter=4
    )

    story = []
    
    # Header
    story.append(Paragraph("ALEXANDROS ARISTIDOU", title_style))
    story.append(Paragraph("Email: alex.aristidou@utexas.edu &nbsp;|&nbsp; Web: www.linkedin.com/in/alexaris", subtitle_style))
    
    # Helper to add section lines
    def add_section_header(title):
        story.append(Spacer(1, 4))
        story.append(Paragraph(title, section_heading))
        # Draw a horizontal line using flowable spacer trick or custom flowable
        # For simplicity, we can use a thin Table to act as a solid divider line
        from reportlab.platypus import Table, TableStyle
        line_data = [['']]
        line_table = Table(line_data, colWidths=[504], rowHeights=[1])
        line_table.setStyle(TableStyle([
            ('LINEBELOW', (0,0), (-1,-1), 0.5, colors.HexColor('#14533a')),
            ('BOTTOMPADDING', (0,0), (-1,-1), 0),
            ('TOPPADDING', (0,0), (-1,-1), 0),
        ]))
        story.append(line_table)
        story.append(Spacer(1, 6))

    # EDUCATION
    add_section_header("EDUCATION")
    
    story.append(Paragraph("The University of Texas at Austin - McCombs School of Business <i>(Austin, USA)</i>", item_header))
    story.append(Paragraph("PhD in Management (Specialization: Organizational Behavior) <font color='#4a5568'>&nbsp;|&nbsp; 06/2026 - Present</font>", item_subheader))
    
    story.append(Spacer(1, 4))
    story.append(Paragraph("Esade Business School & CEMS <i>(Barcelona, Spain)</i>", item_header))
    story.append(Paragraph("(Dual Degree) MS in International Management <font color='#4a5568'>&nbsp;|&nbsp; 08/2021 - 07/2023</font>", item_subheader))
    story.append(Paragraph("&bull; GPA: 3.9 / 4.0", body_style))
    story.append(Paragraph("&bull; Graduated in top 10% of cohort, received Distinction award for academic performance", body_style))
    story.append(Paragraph("&bull; CEMS Club Barcelona President", body_style))
    
    story.append(Spacer(1, 4))
    story.append(Paragraph("University of Edinburgh <i>(Edinburgh, UK)</i>", item_header))
    story.append(Paragraph("MA (Hons) in Economics and Mathematics <font color='#4a5568'>&nbsp;|&nbsp; 09/2017 - 06/2021</font>", item_subheader))
    story.append(Paragraph("&bull; GPA: 4.0 / 4.0", body_style))
    story.append(Paragraph("&bull; First Class Honors (Top Classification) with highest overall grade in cohort", body_style))
    story.append(Paragraph("&bull; Ranked 1st out of 391-student cohort", body_style))
    story.append(Paragraph("&bull; Exchange student at University of Queensland, Australia", body_style))
    
    # ACADEMIC RESEARCH EXPERIENCE
    add_section_header("ACADEMIC RESEARCH EXPERIENCE")
    
    story.append(Paragraph("Master's Thesis: Self-selection and social influence biases in reviewing behavior", item_header))
    story.append(Paragraph("University of Edinburgh - supervised by Dr. Jovan Vojnovic", item_subheader))
    story.append(Paragraph("&bull; Processed Amazon reviews dataset (N &asymp; 600K) using NLP sentiment analysis and ordinal logistic models.", body_style))
    
    story.append(Spacer(1, 4))
    story.append(Paragraph("Master's Thesis: Pricing performance and elasticity modeling in QSR Industry", item_header))
    story.append(Paragraph("ESADE Business School - supervised by Dr. Ignasi Alguer&oacute;", item_subheader))
    story.append(Paragraph("&bull; Analyzed 3 years of sales/transaction data from 6,000 Burger King stores across EMEA.", body_style))
    
    story.append(Spacer(1, 4))
    story.append(Paragraph("Understanding Barriers and Improving Psychological Safety", item_header))
    story.append(Paragraph("Restaurant Brands International & We Moving Stories", item_subheader))
    story.append(Paragraph("&bull; Initiated and led survey/qualitative research (200+ employees) on barriers to voice, yielding 10-point score increase.", body_style))

    # INDUSTRY EXPERIENCE
    add_section_header("INDUSTRY EXPERIENCE")
    
    story.append(Paragraph("Restaurant Brands International <i>(Zug, Switzerland)</i>", item_header))
    story.append(Paragraph("Manager (Marketing Analytics / Media Lead & Brand Culture) <font color='#4a5568'>&nbsp;|&nbsp; 09/2023 - 06/2026</font>", item_subheader))
    story.append(Paragraph("&bull; Designed and led mixed-methods research combining surveys, focus groups, and A/B experiments. Promoted twice in two years.", body_style))
    
    story.append(Spacer(1, 4))
    story.append(Paragraph("Amazon UK <i>(Edinburgh, UK)</i>", item_header))
    story.append(Paragraph("Operations and Logistics Intern <font color='#4a5568'>&nbsp;|&nbsp; 06/2021 - 08/2021</font>", item_subheader))
    story.append(Paragraph("&bull; Optimized fulfillment shift scheduling using Python and Excel. Awarded 'Amazon Intern Project of the Month' in EMEA.", body_style))
    
    story.append(Spacer(1, 4))
    story.append(Paragraph("Cyprus National Guard <i>(Nicosia, Cyprus)</i>", item_header))
    story.append(Paragraph("Lance Corporal in the Mechanized Infantry <font color='#4a5568'>&nbsp;|&nbsp; 07/2015 - 01/2017</font>", item_subheader))
    
    # TECHNICAL, ANALYTICAL & LANGUAGE SKILLS
    add_section_header("TECHNICAL, ANALYTICAL & LANGUAGE SKILLS")
    
    story.append(Spacer(1, 4))
    story.append(Paragraph("<b>Data Analysis & Statistics:</b> Regression, ANOVA, Causal Inference, A/B Testing", skills_body_style))
    story.append(Paragraph("<b>Programming & Tools:</b> SQL, R, Python, Power BI, Stata, Wolfram Mathematica", skills_body_style))
    story.append(Paragraph("<b>Languages:</b> Greek (Native), English (Fluent), Spanish (Intermediate)", skills_body_style))
    
    doc.build(story)
    print("PDF CV generated successfully at assets/cv_alexandros_aristidou.pdf")

if __name__ == "__main__":
    generate_pdf()
