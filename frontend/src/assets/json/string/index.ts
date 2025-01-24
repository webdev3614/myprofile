import EN from "./en.json";

type Text = keyof typeof EN

const text = (text: Text, lang: string): string => {
    return EN[text] as string;
}

export {
    text
}