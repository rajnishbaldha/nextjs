import Link from 'next/link';

export function getStaticProps(){
return {
  props:{
    time: new Date().toISOString(),
  },
};
}
export default function FirstPost({ time }:{ time:string }) {
  return (
    <>
      <h1>{ time }</h1>
      <h2>
        <Link href="/">Back to home</Link>
      </h2>
    </>
  );
}