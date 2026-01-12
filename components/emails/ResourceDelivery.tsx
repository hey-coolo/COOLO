import { Body, Container, Head, Heading, Html, Img, Preview, Section, Text, Tailwind, Button } from "@react-email/components";
import * as React from "react";

const baseUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "";

export const ResourceDelivery = ({ resourceName = "Brand Guide 2.0", downloadLink = "#" }) => {
  return (
    <Html>
      <Head>
        <style>{`
          .logo-dark { display: none !important; }
          .logo-light { display: block !important; }
          @media (prefers-color-scheme: dark) {
            .logo-light { display: none !important; }
            .logo-dark { display: block !important; }
            .bg-mode-body { background-color: #010101 !important; }
            .bg-mode-card { background-color: #0F0328 !important; border-color: #7670C5 !important; }
            .text-mode-primary { color: #F7F7F7 !important; }
            .text-mode-secondary { color: #7670C5 !important; }
            .btn-mode-solid { background-color: #F7F7F7 !important; color: #010101 !important; border-color: #F7F7F7 !important; }
          }
        `}</style>
      </Head>
      <Preview>Your download is ready</Preview>
      <Tailwind
        config={{
          theme: {
            extend: {
              colors: {
                'brand-purple': '#3A0888',
                'brand-offwhite': '#F7F7F7',
                'brand-yellow': '#FCC803',
                'brand-lavender': '#7670C5',
                'brand-navy': '#0F0328',
                'brand-dark': '#010101',
              },
            },
          },
        }}
      >
        <Body className="bg-mode-body bg-brand-offwhite font-sans my-auto mx-auto px-4 py-12">
          <Container className="mx-auto w-full max-w-[600px]">
            
            <Section className="mb-10">
              <Img src={`${baseUrl}/static/logo-light-mode.png`} width="110" alt="COOLO" className="logo-light" />
              <Img src={`${baseUrl}/static/logo-dark-mode.png`} width="110" alt="COOLO" className="logo-dark" />
            </Section>

            <Section className="bg-mode-card bg-white border border-brand-dark p-10 shadow-none">
              
              <Section className="mb-6">
                <Text className="text-mode-secondary text-brand-dark font-mono text-[10px] uppercase tracking-widest border border-brand-lavender rounded-full px-3 py-1 inline-block m-0">
                  FILE: 2.4MB
                </Text>
              </Section>

              <Heading className="text-mode-primary text-brand-dark text-[36px] font-black italic uppercase tracking-tighter leading-none m-0 mb-6">
                HERE IS<br/>THE GOODS.
              </Heading>
              
              <Text className="text-mode-primary text-brand-dark text-[16px] leading-[26px] mb-8">
                The nuclear option. We built it. Now you own it. Here is the <strong>{resourceName}</strong> file you requested.
              </Text>

              {/* SOLID BRAND-DARK BUTTON */}
              <Button 
                className="btn-mode-solid bg-brand-dark text-brand-offwhite rounded-none w-full py-5 text-center text-[13px] font-bold uppercase tracking-[0.2em] border-2 border-brand-dark"
                href={downloadLink}
              >
                DOWNLOAD NOW
              </Button>

            </Section>
            
            <Section className="mt-8">
               <Text className="text-mode-secondary text-brand-lavender font-mono text-[10px] uppercase tracking-widest">
                 © 2024 COOLO
               </Text>
            </Section>

          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default ResourceDelivery;