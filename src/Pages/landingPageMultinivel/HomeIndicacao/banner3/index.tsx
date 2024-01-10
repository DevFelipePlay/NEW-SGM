import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Stack,
  Typography,
} from '@mui/material';
import { FaChevronDown } from 'react-icons/fa';

export default function Banner3() {
  return (
    <section id='faq'>
      <Box
        sx={{
          width: '100%',
          backgroundColor: 'white',
          p: {
            xs: 2,
            sm: 3,
            md: 4,
          },
        }}
      >
        <Stack
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            gap: '0.25rem',
            maxWidth: '625px',
            margin: '0 auto',
            zIndex: '-1',
          }}
        >
          <Typography variant={'h4'} color={'var(--primary_color)'} fontWeight='700'>
            Perguntas Frequentes
          </Typography>
        </Stack>
        <Box
          sx={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            padding: {
              md: '2rem 4rem 1rem 4rem',
              sm: '2rem 1.5rem 1rem 1.5rem',
              xs: '2rem 1.5rem 1rem 1.5rem',
            },
            gap: {
              md: '20px',
              sm: '0px',
              xs: '0px',
            },
            margin: '0 auto',
            flexDirection: {
              md: 'row',
              sm: 'column',
              xs: 'column',
            },
          }}
        >
          <Box>
            <PerguntasFrequentes
              textoPergunta={'Pergunta 1'}
              textoResposta={
                '            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ducimus quibusdam odio expedita, velit provident illum delectus cumque neque ea eius temporibus aut praesentium illo ratione quisquam labore, recusandae blanditiis consequatur?'
              }
            />
            <PerguntasFrequentes
              textoPergunta={'Pergunta 3'}
              textoResposta={
                '            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ducimus quibusdam odio expedita, velit provident illum delectus cumque neque ea eius temporibus aut praesentium illo ratione quisquam labore, recusandae blanditiis consequatur?'
              }
            />
            <PerguntasFrequentes
              textoPergunta={'Pergunta 5'}
              textoResposta={
                '            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ducimus quibusdam odio expedita, velit provident illum delectus cumque neque ea eius temporibus aut praesentium illo ratione quisquam labore, recusandae blanditiis consequatur?'
              }
            />
            <PerguntasFrequentes
              textoPergunta={'Pergunta 7'}
              textoResposta={
                '            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ducimus quibusdam odio expedita, velit provident illum delectus cumque neque ea eius temporibus aut praesentium illo ratione quisquam labore, recusandae blanditiis consequatur?'
              }
            />
          </Box>
          <Box>
            <PerguntasFrequentes
              textoPergunta={'Pergunta 2'}
              textoResposta={
                '            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ducimus quibusdam odio expedita, velit provident illum delectus cumque neque ea eius temporibus aut praesentium illo ratione quisquam labore, recusandae blanditiis consequatur?'
              }
            />
            <PerguntasFrequentes
              textoPergunta={'Pergunta 4'}
              textoResposta={
                '            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ducimus quibusdam odio expedita, velit provident illum delectus cumque neque ea eius temporibus aut praesentium illo ratione quisquam labore, recusandae blanditiis consequatur?'
              }
            />
            <PerguntasFrequentes
              textoPergunta={'Pergunta 6'}
              textoResposta={
                '            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ducimus quibusdam odio expedita, velit provident illum delectus cumque neque ea eius temporibus aut praesentium illo ratione quisquam labore, recusandae blanditiis consequatur?'
              }
            />
            <PerguntasFrequentes
              textoPergunta={'Pergunta 8'}
              textoResposta={
                '            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ducimus quibusdam odio expedita, velit provident illum delectus cumque neque ea eius temporibus aut praesentium illo ratione quisquam labore, recusandae blanditiis consequatur?'
              }
            />
          </Box>
        </Box>
      </Box>
    </section>
  );
}

interface IPerguntasFrequentes {
  textoPergunta: string;
  textoResposta: string;
}

function PerguntasFrequentes({ textoPergunta, textoResposta }: IPerguntasFrequentes) {
  return (
    <Accordion
      style={{
        background: 'var(--backGround_default)',
        color: 'var(--primary_color)',
        borderRadius: '6px',
        marginBottom: '0.75rem',
        maxWidth: '500px',
        boxShadow: 'var(--shadow3)',
      }}
    >
      <AccordionSummary
        sx={{
          display: 'flex',
          gap: {
            md: '0.5rem',
            sm: '0.5rem',
            xs: '0.5rem',
          },
        }}
        expandIcon={
          <FaChevronDown
            style={{
              color: 'var(--text_color)',
            }}
          />
        }
        aria-controls='panel1a-content'
        id='panel1a-header'
      >
        <Typography style={{ fontWeight: '600', color: 'var(--text_color)' }}>
          {textoPergunta}
        </Typography>
      </AccordionSummary>
      <AccordionDetails style={{ background: '#fff', color: 'var(--text_color)' }}>
        <Typography
          sx={{
            color: 'var(--backGround_default)',
          }}
        >
          {textoResposta}
        </Typography>
      </AccordionDetails>
    </Accordion>
  );
}
