// api/translateLibre.js

export default async function handler(req, res) {
  const { word } = req.query;

  if (!word) {
    return res.status(400).json({ error: 'No word provided' });
  }

  try {
    const response = await fetch("https://libretranslate.de/translate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        q: word,
        source: "en", // исходный язык (английский)
        target: "ru", // язык перевода (русский)
        format: "text"
      })
    });

    const data = await response.json();

    if (data.translatedText) {
      return res.status(200).json({ translated: data.translatedText });
    } else {
      return res.status(500).json({ error: "Translation failed" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Error with translation API" });
  }
}
