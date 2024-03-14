'use client'

import Nav from '@/components/Nav';
import '../style/style.scss'
import Header from '@/components/Header';
import Competences from '@/components/Competences';

export default function Home() {
  return (
    <>
      <Nav />
      <Header />
      <Competences />
    </>
  );
}
