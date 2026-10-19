import sys
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.lib.colors import HexColor
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.enums import TA_LEFT
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable, KeepTogether,
)

OUT = sys.argv[1]

INK = HexColor("#111111")
MUTED = HexColor("#555555")
ACCENT = HexColor("#15803d")
RULE = HexColor("#cfcfcf")

base = dict(fontName="Helvetica", textColor=INK, alignment=TA_LEFT)
name_s = ParagraphStyle("name", fontName="Helvetica-Bold", fontSize=22, leading=25, textColor=INK)
tag_s = ParagraphStyle("tag", fontSize=10, leading=13, textColor=MUTED, **{k: v for k, v in base.items() if k != "textColor"})
contact_s = ParagraphStyle("contact", fontSize=8.8, leading=12, textColor=INK, fontName="Helvetica")
h_s = ParagraphStyle("h", fontName="Helvetica-Bold", fontSize=10, leading=12, textColor=ACCENT, spaceBefore=7, spaceAfter=2)
body_s = ParagraphStyle("body", fontSize=9, leading=12.2, **base)
title_s = ParagraphStyle("title", fontName="Helvetica-Bold", fontSize=9.5, leading=12.2, textColor=INK)
right_s = ParagraphStyle("right", fontSize=8.6, leading=12.2, textColor=MUTED, fontName="Helvetica", alignment=2)
meta_s = ParagraphStyle("meta", fontSize=8.6, leading=11.4, textColor=MUTED, fontName="Helvetica-Oblique")
bullet_s = ParagraphStyle("bullet", fontSize=9, leading=11.8, leftIndent=10, bulletIndent=1, **base)

def link(url, text=None):
    return f'<link href="{url}" color="#111111"><u>{text or url.replace("https://", "")}</u></link>'

def section(title):
    return [
        Paragraph(title.upper(), h_s),
        HRFlowable(width="100%", thickness=0.6, color=RULE, spaceBefore=0, spaceAfter=3),
    ]

def row(left, right):
    t = Table([[Paragraph(left, title_s), Paragraph(right, right_s)]], colWidths=["74%", "26%"])
    t.setStyle(TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 0), ("RIGHTPADDING", (0, 0), (-1, -1), 0),
        ("TOPPADDING", (0, 0), (-1, -1), 0), ("BOTTOMPADDING", (0, 0), (-1, -1), 0),
    ]))
    return t

def bullets(items):
    return [Paragraph(i, bullet_s, bulletText="•") for i in items]

def project(title, subtitle, repo, stack, items, right=""):
    flow = [
        row(f"{title} <font name='Helvetica' color='#555555'>— {subtitle}</font>", right or link(f"https://github.com/Amulpappu/{repo}", "GitHub")),
        Paragraph(stack, meta_s),
        *bullets(items),
        Spacer(1, 4),
    ]
    return KeepTogether(flow)

story = []

# Header
story += [
    Paragraph("LOHITH K", name_s),
    Paragraph("B.E. Computer Science &amp; Engineering (Cyber Security) Student · Coimbatore, Tamil Nadu, India", tag_s),
    Spacer(1, 3),
    Paragraph(
        " &nbsp;|&nbsp; ".join([
            link("mailto:lohithgamer12@gmail.com", "lohithgamer12@gmail.com"),
            link("https://lohith-portfolio-ten.vercel.app", "lohith-portfolio-ten.vercel.app"),
            link("https://github.com/Amulpappu", "github.com/Amulpappu"),
            link("https://www.linkedin.com/in/lohith-k-b1331a3a8", "linkedin.com/in/lohith-k-b1331a3a8"),
        ]),
        contact_s,
    ),
]

# Summary
story += section("Summary")
story.append(Paragraph(
    "First-year Cyber Security student who builds and ships working software: Discord automation with an admin "
    "dashboard, an Android expense tracker, and an AI crop-disease screening app. Comfortable across Python, "
    "TypeScript and Kotlin, from backend APIs to mobile and web front ends. Looking for software engineering "
    "and cyber security internships.",
    body_s,
))

# Education
story += section("Education")
story += [
    row("Rathinam Technical Campus, Coimbatore", "2026 – Present"),
    Paragraph("B.E. Computer Science and Engineering (Cyber Security) · Semester 1", body_s),
    Spacer(1, 4),
    row("Srividyalayam Matric Hr. Sec. School, Madurai", "Completed 2026"),
    Paragraph("Class 12 (HSC), Computer Science group · Tamil Nadu State Board", body_s),
]

# Projects
story += section("Projects")
story += [
    project(
        "Jiraiya Bot Monitor", "Mechanic shop management &amp; admin panel", "jiraiya-bot-monitor",
        "Python · discord.py · Flask · Tesseract OCR · Google Sheets API (gspread) · Render",
        [
            "Discord bot that reads service, kit and invoice messages, including screenshots via OCR, and logs them to Google Sheets, skipping duplicates.",
            "Flask web dashboard with login and role-based access (Admin / Manager / Employee) for employees, transactions, inventory and audit logs.",
            "Kit and service pricing helpers; bot and dashboard run together as one service deployed on Render.",
        ],
    ),
    project(
        "AgriGuard", "AI crop disease detection for Indian farmers", "AgriGuard",
        "Next.js · Tailwind CSS · FastAPI · SQLAlchemy · Supabase · Docker",
        [
            "Mobile-first web app that screens a photo of a leaf for diseases, pests, nutrient problems and stress across 14+ Indian crops.",
            "Confidence policy that withholds results when the model is unsure and refers the farmer to an expert; no chemical prescriptions.",
            "Submitted to the Seva First Innovation Challenge (SFIC) 2026.",
        ],
    ),
    project(
        "SpendWise", "Android bank &amp; UPI expense tracker", "SpendWise",
        "Kotlin · Android · Firebase Authentication · Google Sheets sync",
        [
            "Reads bank and UPI SMS alerts on-device to track transactions and running balances offline; data stays on the phone.",
            "Generates password-protected PDF and Excel account statements and syncs each user's ledger to Google Sheets.",
        ],
    ),
    project(
        "Manjummel", "All-rounder Discord bot", "Manjummel",
        "Python · discord.py · Pillow",
        [
            "Music player with button controls, welcome cards, invite tracker, server stats, and moderation commands with audit logs.",
        ],
    ),
    project(
        "Moonlight ML Workshop", "Real-time machine learning in the browser", "MoonLight-Machine-Learning-Workshop",
        "JavaScript · ml5.js · p5.js · Google Teachable Machine",
        [
            "Three webcam/microphone apps (image, audio and pose recognition) using models I trained with Teachable Machine.",
        ],
    ),
]

# Skills
story += section("Skills")
skills = [
    ("Languages", "Python, TypeScript, JavaScript, Kotlin, HTML/CSS"),
    ("Web &amp; backend", "React, Next.js, Vite, Tailwind CSS, FastAPI, Flask"),
    ("AI &amp; automation", "Discord bots (discord.py), OCR (Tesseract), ml5.js, Teachable Machine, Google Sheets API"),
    ("Data &amp; cloud", "PostgreSQL, Supabase, Firebase, Docker, Vercel, Render, Oracle"),
    ("Productivity", "Microsoft Excel, Google Sheets (spreadsheets)"),
    ("Tools", "Git, GitHub, Antigravity"),
    ("Creative", "Blender, Adobe After Effects, Runway"),
]
t = Table([[Paragraph(f"<b>{k}</b>", body_s), Paragraph(v, body_s)] for k, v in skills], colWidths=["20%", "80%"])
t.setStyle(TableStyle([
    ("VALIGN", (0, 0), (-1, -1), "TOP"),
    ("LEFTPADDING", (0, 0), (-1, -1), 0), ("RIGHTPADDING", (0, 0), (-1, -1), 0),
    ("TOPPADDING", (0, 0), (-1, -1), 0.5), ("BOTTOMPADDING", (0, 0), (-1, -1), 0.5),
]))
story.append(t)

# Achievements
story += section("Competitions")
story += bullets([
    "<b>Vishwakarma Awards 2026–27</b> — CurrentGuard AI (Sustainable Energy · Smart Grids): Stage 2, Design Development.",
    "<b>Seva First Innovation Challenge (SFIC) 2026</b> — AgriGuard: Submitted.",
    "<b>IndiaSkills Competition 2026–27 (Tamil Nadu)</b> — Registered, team-skill entry.",
])

doc = SimpleDocTemplate(
    OUT, pagesize=A4,
    leftMargin=16 * mm, rightMargin=16 * mm, topMargin=13 * mm, bottomMargin=12 * mm,
    title="Lohith K — Résumé", author="Lohith K", subject="Résumé",
)
doc.build(story)
print("written", OUT)
