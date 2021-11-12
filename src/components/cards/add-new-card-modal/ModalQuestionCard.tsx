import React, {CSSProperties, ReactNode} from 'react';


interface IModalQuestion {
    show: boolean;

    setTrue: () => void;
    setFalse: () => void;
    buttonStyles?: CSSProperties;
    trueStyles?: CSSProperties;
    falseStyles?: CSSProperties;
    buttonTrue?: ReactNode;
    buttonFalse?: ReactNode;

    enableBackground?: boolean;
    backgroundStyle?: CSSProperties;
    backgroundOnClick?: () => void;

    width: number;
    height: number;
    modalStyle?: CSSProperties;
    modalOnClick?: () => void;
}

const ModalQuestionCard: React.FC<IModalQuestion> = (
    {
        setTrue,
        setFalse,
        buttonStyles,
        trueStyles,
        falseStyles,
        buttonTrue = 'Yes',
        buttonFalse = 'No',

        enableBackground,
        backgroundStyle,
        backgroundOnClick = () => {},

        width,
        height,
        modalStyle,
        modalOnClick = () => {},

        show,
        children,
    }
) => {
    interface IModal {
        enableBackground?: boolean;
        backgroundStyle?: CSSProperties;
        backgroundOnClick?: () => void;

        width: number;
        height: number;
        modalStyle?: CSSProperties;
        modalOnClick?: () => void;

        show: boolean
    }

    const Modal: React.FC<IModal> = (
        {
            enableBackground,
            backgroundStyle,
            backgroundOnClick = () => {},

            width,
            height,
            modalStyle,
            modalOnClick = () => {},

            show,
            children,
        }
    ) => {
        const top = `calc(50vh - ${height / 2}px)`;
        const left = `calc(50vw - ${width / 2}px)`;

        if (!show) return null;

        return (
            <>
                {enableBackground && <div
                    style={{
                        position: 'fixed',
                        top: '0px',
                        left: '0px',
                        width: '100vw',
                        height: '100vh',

                        background: 'black',
                        opacity: 0.35,
                        zIndex: 20,

                        ...backgroundStyle,
                    }}
                    onClick={backgroundOnClick}
                />}
                <div
                    style={{
                        position: 'fixed',
                        top,
                        left,
                        width,
                        height,
                        display: 'flex',
                        flexFlow: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',

                        background: 'lime',
                        zIndex: 21,

                        ...modalStyle,
                    }}
                    onClick={modalOnClick}
                >
                    {children}
                </div>
            </>
        );
    };
    return (
        <Modal
            enableBackground={enableBackground}
            backgroundOnClick={backgroundOnClick}
            backgroundStyle={backgroundStyle}

            width={width}
            height={height}
            modalOnClick={modalOnClick}
            modalStyle={modalStyle}

            show={show}
        >
            {children ? children : 'question Modal'}
            <div
                style={{
                    width: '100%',
                    display: 'flex',
                    flexFlow: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-around',
                    ...buttonStyles,
                }}
            >
                <button onClick={setTrue} style={{...trueStyles}}>{buttonTrue}</button>
                <button onClick={setFalse} style={{...falseStyles}}>{buttonFalse}</button>
            </div>
        </Modal>
    );
};

export default ModalQuestionCard;