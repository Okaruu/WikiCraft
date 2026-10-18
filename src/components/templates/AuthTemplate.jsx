import MusicButton from "../molecules/MusicButton";

function AuthTemplate({ children }) {
    return (
        <main className="auth-template container-fluid">
            <div className="auth-music">
                <MusicButton />
            </div>
            {children}
        </main>
    );
}

export default AuthTemplate;