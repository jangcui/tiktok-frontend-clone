import { Helmet } from 'react-helmet';

function ChangeTitle({ title }) {
    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>{title} | TikTok</title>
            </Helmet>
        </>
    );
}

export default ChangeTitle;
