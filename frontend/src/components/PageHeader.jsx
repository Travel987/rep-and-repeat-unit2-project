function PageHeader({ eyebrow, title, subtitle }) {
    return (
        <header className="page-header">
            {eyebrow && <p className="eyebrow">{eyebrow}</p>}
            <h1>{title}</h1>
            {subtitle && <p className="subtext">{subtitle}</p>}
        </header>
    );
}

export default PageHeader;