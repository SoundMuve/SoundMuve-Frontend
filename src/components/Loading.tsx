export default function LoadingComponent() {
    return (
        <main>
            <div className="breathing-image">
                <img src="/src/assets/images/icon.png" alt="loading icon" style={{width: 130}} />
                <style>
                    {`
                        .breathing-image {
                            animation: breathe ${2}s ease-in-out infinite;
                        }

                        @keyframes breathe {
                            0% {
                                transform: scale(1);
                            }
                            50% {
                                transform: scale(${0.7});
                            }
                            100% {
                                transform: scale(1);
                            }
                        }
                    `}
                </style>
            </div>
        </main>
    );
}