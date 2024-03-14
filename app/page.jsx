'use client'

import Nav from '@/components/Nav';
import '../style/style.scss'
import Header from '@/components/Header';
import Competances from '@/components/Competances';

export default function Home() {
  return (
    <>
      <Nav />
      <Header />
      <Competances />
    </>
  );
}
