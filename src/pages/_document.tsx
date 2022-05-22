import Document, {Html, Main, Head, NextScript, DocumentContext, DocumentInitialProps} from "next/document";

class MyDocument extends Document {
    public static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps> {
        const initialProps = await Document.getInitialProps(ctx)

        return { ...initialProps }
    }

    render(): JSX.Element {
        return (
            <Html lang="en">
                <Head />
                <body>
                    <Main />
                    <NextScript/>
                </body>
            </Html>
        )
    }
}

export default MyDocument