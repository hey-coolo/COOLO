import * as React from 'react';
import { Html, Head, Body, Container, Section, Text, Heading, Link, Img, Preview } from '@react-email/components';

const colors = { navy: '#0F0328', offWhite: '#F7F7F7', purple: '#3A0888', yellow: '#FCC803' };

export const ResourceDelivery = ({ resourceName, downloadLink }: { resourceName: string; downloadLink: string }) => {
  return (
    <Html>
      <Head />
      <Preview>Your tool is ready for download.</Preview>
      <Body style={{ backgroundColor: colors.offWhite, fontFamily: 'Helvetica, Arial, sans-serif', padding: '40px 0' }}>
        <Container style={{ margin: '0 auto', maxWidth: '580px', padding: '0 20px' }}>
          
          <Section style={{ textAlign: 'center' as const, marginBottom: '40px' }}>
             <Img 
                src="https://coolo.co.nz/assets/logos/logo-dark.svg" 
                alt="COOLO" 
                width="90" 
                style={{ margin: '0 auto' }}
             />
          </Section>
          
          <Section style={{ backgroundColor: '#ffffff', border: `2px solid ${colors.navy}`, padding: '48px', boxShadow: `16px 16px 0px 0px ${colors.yellow}` }}>
            <Text style={{ fontStyle: 'italic', fontSize: '12px', color: colors.purple, fontWeight: 700, textTransform: 'uppercase', marginBottom: '16px', letterSpacing: '0.1em' }}>
              Free Game // Sequence Unlocked
            </Text>
            
            <Heading style={{ color: colors.navy, fontSize: '42px', fontWeight: 900, textTransform: 'uppercase', lineHeight: '0.9', margin: '0 0 24px' }}>
                Tool<br/><span style={{ color: colors.purple }}>Retrieved.</span>
            </Heading>
            
            <Text style={{ color: colors.navy, fontSize: '17px', lineHeight: '1.6', opacity: 0.8, marginBottom: '32px' }}>
              The <strong>{resourceName}</strong> is ready for use. We don't hide our logic—we open-source it so you can build faster.
            </Text>
            
            <Link href={downloadLink} style={{ backgroundColor: colors.navy, color: colors.offWhite, padding: '20px 40px', display: 'inline-block', fontWeight: 700, textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.2em', fontSize: '13px' }}>
                Grab the goods
            </Link>
          </Section>

          <Section style={{ marginTop: '54px', borderTop: '1px solid #e0e0e0', paddingTop: '32px', textAlign: 'center' as const }}>
            <Text style={{ color: '#aaa', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.2em', lineHeight: '2' }}>
              COOLO STUDIO // ARTIST LED // Mount Maunganui, NZ
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default ResourceDelivery;