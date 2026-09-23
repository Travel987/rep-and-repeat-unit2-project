function NavButton({ page, activePage, setActivePage, children }) {
    return (
        <button
            type="button"
            className={`nav-item ${activePage === page ? "active" : ""}`}
            onClick={() => setActivePage(page)}
        >
            {children}
        </button>
    );
}

export default NavButton;