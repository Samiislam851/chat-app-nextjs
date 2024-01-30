import { db } from "@/lib/db";
import Image from "next/image";

export default async function Home() {
  await db.set('hello', 'hello')

  return (
    <>

      <h1 className="text-red-500 text-7xl">Hello</h1>
    </>
  );
}
