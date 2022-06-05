import React, { useEffect, useState } from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
function App() {
  const [count, setCount] = useState(0);
  const [sentenceCount, setSentenceCount] = useState(0);
  const [text, setText] = useState('');
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const getText = async () => {
    try {
      if (sentenceCount == 0) {
        setText('');
        return;
      } else {
        setIsLoading(true);
        const response = await fetch(
          `https://hipsum.co/api/?type=hipster-centric&sentences=${count}`
        );
        if (!response.ok) throw new Error(response.message);
        const data = await response.json();
        setText(data);
        setIsLoading(false);
      }
    } catch (err) {
      setIsLoading(false);
      setIsError(true);
      console.error(err.message);
    }
  };

  useEffect(() => {
    getText();
  }, [sentenceCount]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSentenceCount(count);
  };

  return (
    <section className='section-center'>
      <h3>random sentence generator</h3>
      <form className='lorem-form' onSubmit={handleSubmit}>
        <label htmlFor='amount'>Sentence count:</label>
        <input
          type='number'
          name='amount'
          id='amount'
          value={count}
          onChange={(e) => {
            return setCount(e.target.value < 0 ? 0 : e.target.value);
          }}
        />

        <button type='submit' className='btn'>
          Generate
        </button>
      </form>
      <footer className='footer'>
        &copy; Copyright {new Date().getFullYear()} by{' '}
        <a className='footer__link' href='https://github.com/MrTeymurov'>
          Sabuhi Teymurov
        </a>
      </footer>
      {isLoading ? (
        <div className='spinner'>
          <AiOutlineLoading3Quarters
            style={{
              height: '3rem',
              width: '3rem',
              fill: '$color-primary',
              animation: 'rotate 0.7s infinite linear',
            }}
          />
        </div>
      ) : (
        <article className='lorem-text'>
          <p>{text}</p>
        </article>
      )}
    </section>
  );
}

export default App;
