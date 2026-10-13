import { Fragment } from 'react'
import { motion } from 'framer-motion'

// Word-by-word rising text reveal. Screen readers get the full sentence via aria-label.
export default function RevealText({
  text,
  as: Tag = 'h1',
  className = '',
  delay = 0,
  stagger = 0.09,
}) {
  const words = text.split(' ')
  return (
    <Tag className={className} aria-label={text}>
      {words.map((word, i) => (
        <Fragment key={`${word}-${i}`}>
          <span
            aria-hidden="true"
            className="-mb-[0.14em] inline-block overflow-hidden pb-[0.14em] align-bottom"
          >
            <motion.span
              className="inline-block"
              initial={{ y: '110%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: delay + i * stagger, ease: [0.22, 1, 0.36, 1] }}
            >
              {word}
            </motion.span>
          </span>
          {i < words.length - 1 ? ' ' : null}
        </Fragment>
      ))}
    </Tag>
  )
}
