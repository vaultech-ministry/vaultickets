import { Link } from "react-router-dom";

function RedirectPage() {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg text-center">
                <h2 className="text-2xl font-bold text-indigo-500">Welcome to Vault Church Ministry😊!</h2>
                <p className="mt-4 text-gray-300">
                    Your registration was successful! We are thrilled to have you as part of the Vault family. 
                    Your details are secure with us, and we can't wait to connect and grow together in faith.
                </p>
                <p className="mt-2 text-gray-400">
                    Stay tuned for updates, events, and fellowship opportunities.
                </p>
                <Link to="/" className="mt-6 inline-block bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-md transition">
                    Back to Form
                </Link>
            </div>
        </div>
    );
};

export default RedirectPage;
