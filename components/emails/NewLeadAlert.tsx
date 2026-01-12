import { Body, Container, Head, Heading, Html, Img, Preview, Section, Text, Tailwind, Row, Column } from "@react-email/components";
import * as React from "react";

const baseUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "";

export const NewLeadAlert = ({ email = "test@test.com", message = "Pricing inquiry", source = "Website" }) => {
  return (
    <Html>
      <Head>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Big+Shoulders+Display:wght@800;900&family=Space+Mono:wght@400;700&display=swap');
        `}</style>
      </Head>
      <Preview>New Lead: {source}</Preview>
      <Tailwind
        config={{
          theme: {
            extend: {
              colors: {
                navy: '#0F0328',
                offWhite: '#F7F7F7',
                purple: '#3A0888',
                yellow: '#FCC803',
                lavender: '#7670C5',
              },
              fontFamily: {
                display: ['"Big Shoulders Display"', 'sans-serif'],
                mono: ['"Space Mono"', 'monospace'],
                sans: ['Helvetica', 'Arial', 'sans-serif'],
              }
            },
          },
        }}
      >
        <Body className="bg-offWhite font-sans my-auto mx-auto px-4 py-12">
          <Container className="mx-auto w-full max-w-[580px]">
            
            <Section className="bg-white border border-lavender/30 p-10 shadow-sm rounded-sm">
              
              <Text className="bg-yellow text-navy font-mono text-[11px] font-bold uppercase tracking-widest px-2 py-1 inline-block mb-4 rounded-sm">
                // INBOUND SIGNAL
              </Text>

              <Heading className="font-display text-navy text-[56px] leading-[0.9] font-black uppercase m-0 mb-8">
                NEW LEAD<br/>DETECTED
              </Heading>

              {/* Data Grid with Navy Border Lines */}
              <Section className="border-t border-navy/10">
                <Row className="border-b border-navy/10 py-3">
                  <Column className="w-[100px]">
                    <Text className="font-mono text-[10px] text-purple uppercase tracking-widest m-0">SOURCE</Text>
                  </Column>
                  <Column>
                    <Text className="font-sans text-navy font-bold text-[14px] m-0">{source}</Text>
                  </Column>
                </Row>
                <Row className="border-b border-navy/10 py-3">
                  <Column className="w-[100px]">
                    <Text className="font-mono text-[10px] text-purple uppercase tracking-widest m-0">EMAIL</Text>
                  </Column>
                  <Column>
                    <Text className="font-sans text-navy font-bold text-[14px] m-0">{email}</Text>
                  </Column>
                </Row>
                <Row className="border-b border-navy/10 py-3">
                  <Column className="w-[100px] align-top">
                    <Text className="font-mono text-[10px] text-purple uppercase tracking-widest m-0">MSG</Text>
                  </Column>
                  <Column>
                    <Text className="font-sans text-navy text-[14px] italic m-0 opacity-80">"{message}"</Text>
                  </Column>
                </Row>
              </Section>

            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default NewLeadAlert;