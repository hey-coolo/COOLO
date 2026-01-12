import * as React from 'react';
import { Html, Head, Body, Container, Section, Text, Heading, Img, Hr, Row, Column } from '@react-email/components';

const colors = { navy: '#0F0328', offWhite: '#F7F7F7', purple: '#3A0888', yellow: '#FCC803' };

interface NewLeadAlertProps {
  name: string;
  email: string;
  vibe: string;
  message: string;
  budget?: string;
}

export const NewLeadAlert = ({ name, email, vibe, message, budget }: NewLeadAlertProps) => {
  return (
    <Html>
      <Head />
      <Body style={{ backgroundColor: colors.offWhite, fontFamily: 'Helvetica, Arial, sans-serif', padding: '40px 0' }}>
        <Container style={{ margin: '0 auto', maxWidth: '600px', padding: '0 20px' }}>
          
          <Section style={{ marginBottom: '32px' }}>
            <Img src="https://coolo.co.nz/assets/logos/logo-dark.svg" alt="COOLO" width="70" />
            <Text style={{ fontSize: '11px', fontWeight: 700, color: colors.purple, textTransform: 'uppercase', marginTop: '12px', letterSpacing: '0.2em' }}>
              Inbound Lead // New Brief
            </Text>
          </Section>

          <Section style={{ backgroundColor: '#ffffff', border: `2px solid ${colors.navy}`, padding: '48px', boxShadow: `12px 12px 0px 0px ${colors.navy}` }}>
            <Heading style={{ color: colors.navy, fontSize: '32px', fontWeight: 900, textTransform: 'uppercase', margin: '0 0 32px', lineHeight: '1' }}>
                Conversation:<br/>{name}
            </Heading>

            <Row style={{ marginBottom: '24px' }}>
                <Column>
                    <Text style={{ fontSize: '9px', fontWeight: 700, color: '#999', textTransform: 'uppercase', margin: '0', letterSpacing: '0.1em' }}>Email</Text>
                    <Text style={{ fontSize: '16px', color: colors.navy, fontWeight: 700, margin: '4px 0 0' }}>{email}</Text>
                </Column>
                <Column>
                    <Text style={{ fontSize: '9px', fontWeight: 700, color: '#999', textTransform: 'uppercase', margin: '0', letterSpacing: '0.1em' }}>Vibe</Text>
                    <Text style={{ fontSize: '16px', color: colors.navy, fontWeight: 700, margin: '4px 0 0' }}>{vibe}</Text>
                </Column>
            </Row>

            {budget && (
                <div style={{ marginBottom: '32px' }}>
                    <Text style={{ fontSize: '9px', fontWeight: 700, color: '#999', textTransform: 'uppercase', margin: '0', letterSpacing: '0.1em' }}>Budget</Text>
                    <Text style={{ fontSize: '16px', color: colors.navy, margin: '4px 0 0' }}>{budget}</Text>
                </div>
            )}

            <Hr style={{ borderColor: '#eee', margin: '32px 0' }} />

            <div>
                <Text style={{ fontSize: '9px', fontWeight: 700, color: '#999', textTransform: 'uppercase', margin: '0', letterSpacing: '0.1em' }}>The Context</Text>
                <Text style={{ fontSize: '16px', color: colors.navy, lineHeight: '1.6', margin: '12px 0 0', fontStyle: 'italic' }}>"{message}"</Text>
            </div>
          </Section>
          
          <Text style={{ textAlign: 'center' as const, color: '#999', fontSize: '10px', marginTop: '32px', letterSpacing: '0.2em' }}>
            SYSTEM GENERATED // COOLO.CO.NZ
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

export default NewLeadAlert;