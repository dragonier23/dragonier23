import { promises as fs } from "fs";

async function main(){
  const res = await fetch("https://xkcd.com/info.0.json");
  const data = await res.json() ;

  const newSection = `![${data.title}](${data.img})`;

  const readme = await fs.readFile("README.md", "utf-8") ;

  const updated = readme.replace(
    /(?<=<!-- XKCD -->)([\s\S]*?)(?=<!-- END XKCD -->)/,
    `\n${newSection}\n`
  );

  await fs.writeFile("README.md", updated);
}


main().catch((err) => {
  console.error(err); 
  process.exit(1)
})
