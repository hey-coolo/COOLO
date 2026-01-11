import * as React from 'react';
import { Html, Head, Body, Container, Section, Text, Heading, Link, Hr, Preview, Row, Column } from '@react-email/components';

const colors = {
  navy: '#0F0328',
  offWhite: '#F7F7F7',
  purple: '#3A0888',
  yellow: '#FCC803',
};

interface NewLeadAlertProps {
  name: string;
  email: string;
  vibe: string;
  budget: string;
  message: string;
}

export const NewLeadAlert = ({ name, email, vibe, budget, message }: NewLeadAlertProps) => {
  return (
    <Html>
      <Head>
        <style dangerouslySetInnerHTML={{__html: `
          @import url('https://fonts.googleapis.com/css2?family=Big+Shoulders+Display:wght@900&family=Space+Mono:wght@400;700&display=swap');
        `}} />
      </Head>
      <Preview>New Lead: {name} ({vibe})</Preview>
      <Body style={main}>
        <Container style={container}>
          
          {/* HEADER */}
          <Section style={header}>
            <Row>
                <Column>
                    <Heading style={brandLogo}>COOLO</Heading>
                </Column>
                <Column style={{textAlign: 'right'}}>
                    <Text style={statusBadge}>INCOMING_LEAD</Text>
                </Column>
            </Row>
          </Section>

          {/* MAIN CARD */}
          <Section style={card}>
            <Heading style={h1}>{name.toUpperCase()}</Heading>
            <Link href={`mailto:${email}`} style={link}>{email}</Link>
            
            <Hr style={divider} />
            
            <Row style={{marginBottom: '24px'}}>
                <Column>
                    <Text style={label}>MISSION VIBE</Text>
                    <Text style={value}>{vibe}</Text>
                </Column>
                <Column>
                    <Text style={label}>BUDGET TIER</Text>
                    <Text style={value}>{budget}</Text>
                </Column>
            </Row>

            <Text style={label}>BRIEF / CONTEXT</Text>
            <Text style={bodyText}>"{message}"</Text>

            <Link href={`mailto:${email}?subject=Re: Project Inquiry`} style={button}>
              REPLY TO LEAD
            </Link>
          </Section>

          {/* FOOTER */}
          <Section style={footer}>
            <Text style={footerText}>
              SYSTEM NOTIFICATION<br/>
              SENT FROM COOLO.CO.NZ
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default NewLeadAlert;

// --- STYLES ---
const main = {
  backgroundColor: '#F2F2F2',
  fontFamily: 'Helvetica, Arial, sans-serif',
};

const container = {
  margin: '0 auto',
  padding: '40px 0',
  maxWidth: '600px',
};

const header = {
  marginBottom: '24px',
  padding: '0 8px',
};

const brandLogo = {
  fontFamily: '"Big Shoulders Display", sans-serif',
  fontSize: '24px',
  fontWeight: 900,
  color: colors.navy,
  margin: 0,
};

const statusBadge = {
  fontFamily: '"Space Mono", monospace',
  fontSize: '10px',
  fontWeight: 700,
  letterSpacing: '0.1em',
  color: colors.purple,
  backgroundColor: 'rgba(58, 8, 136, 0.1)',
  padding: '4px 8px',
  borderRadius: '4px',
};

const card = {
  backgroundColor: '#FFFFFF',
  padding: '40px',
  border: `1px solid ${colors.navy}`,
  boxShadow: '4px 4px 0px 0px rgba(15, 3, 40, 0.1)',
};

const h1 = {
  fontFamily: '"Big Shoulders Display", sans-serif',
  fontSize: '48px',
  fontWeight: 900,
  color: colors.navy,
  lineHeight: '1',
  margin: '0 0 8px',
  textTransform: 'uppercase' as const,
};

const link = {
  fontFamily: '"Space Mono", monospace',
  fontSize: '14px',
  color: colors.purple,
  textDecoration: 'none',
  borderBottom: `1px solid ${colors.purple}`,
};

const divider = {
  borderColor: 'rgba(15, 3, 40, 0.1)',
  margin: '32px 0',
};

const label = {
  fontFamily: '"Space Mono", monospace',
  fontSize: '10px',
  fontWeight: 700,
  letterSpacing: '0.1em',
  color: 'rgba(15, 3, 40, 0.4)',
  marginBottom: '8px',
  textTransform: 'uppercase' as const,
};

const value = {
  fontFamily: 'Helvetica, Arial, sans-serif',
  fontSize: '18px',
  fontWeight: 700,
  color: colors.navy,
  margin: '0',
};

const bodyText = {
  fontFamily: 'Helvetica, Arial, sans-serif',
  fontSize: '16px',
  lineHeight: '1.6',
  color: 'rgba(15, 3, 40, 0.8)',
  backgroundColor: 'rgba(15, 3, 40, 0.03)',
  padding: '24px',
  margin: '0 0 32px',
  fontStyle: 'italic',
};

const button = {
  backgroundColor: colors.navy,
  color: colors.offWhite,
  fontFamily: '"Space Mono", monospace',
  fontSize: '14px',
  fontWeight: 700,
  textDecoration: 'none',
  padding: '16px 32px',
  display: 'inline-block',
  textTransform: 'uppercase' as const,
  letterSpacing: '0.1em',
};

const footer = {
  textAlign: 'center' as const,
  marginTop: '32px',
};

const footerText = {
  fontFamily: '"Space Mono", monospace',
  fontSize: '10px',
  color: 'rgba(15, 3, 40, 0.3)',
  letterSpacing: '0.1em',
  lineHeight: '1.6',
};