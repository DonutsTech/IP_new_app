'use client'

import { useState } from 'react';
import styles from './styles.module.scss';
import classNames from 'classnames';
import { phoneMask } from '@/util/PhoneMask';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone, faUser } from '@fortawesome/free-solid-svg-icons';

interface MensageProps {
  name: string;
  email: string;
  phone: string;
  mensagem: string;
}

const FormHelp = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [mensagem, setMensagem] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const [mensage, setMensage] = useState<MensageProps>({
    name: '',
    email: '',
    phone: '',
    mensagem: ''
  });


  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch('/api/validate-domain', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const data = await res.json();
      if (!data.valid) {
        setError('E-mail inválido.');
        setLoading(false);
        return;
      }


      if (data.status === 200) {
        setMensage({
          name,
          email,
          phone,
          mensagem
        });

        console.log(mensage);
      }
      setName('');
      setEmail('');
      setPhone('');
      setMensagem('');
    } catch (err) {
      console.error(err);
      setError('Erro ao validar e-mail.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.formHelp}>
      <h3
        className={styles.formHelp_title}
      >
        Estamos aqui para ajudar
      </h3>

      <form
        className={styles.formHelp_form}
        onSubmit={handleSubmit}
      >
        <label
          htmlFor="name"
          className={classNames({
            [styles.formHelp_form_label]: true,
            [styles.formHelp_form_label_name]: true
          })}
        >
          <FontAwesomeIcon
            icon={faUser}
            className={styles.formHelp_form_label_icon}
          />
          <input
            type='text'
            id='name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder='Digite seu nome*'
            required
          />
        </label>

        <label
          htmlFor="email"
          className={classNames({
            [styles.formHelp_form_label]: true,
            [styles.formHelp_form_label_email]: true
          })}
        >
          <FontAwesomeIcon icon={faEnvelope}
            className={styles.formHelp_form_label_icon} />
          <input
            type='email'
            id='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Digite seu email*'
            required
          />
        </label>

        <label
          htmlFor="phone"
          className={classNames({
            [styles.formHelp_form_label]: true,
            [styles.formHelp_form_label_phone]: true
          })}

        >
          <FontAwesomeIcon icon={faPhone}
            className={styles.formHelp_form_label_icon}
          />
          <input
            type='text'
            id='phone'
            value={phoneMask(phone)}
            onChange={(e) => setPhone(e.target.value)}
            placeholder='Digite seu telefone*'
            required
          />
        </label>

        <label
          htmlFor="mensagem"
          className={classNames({
            [styles.formHelp_form_label]: true,
            [styles.formHelp_form_label_mensagem]: true
          })}
        >
          <textarea
            id='mensagem'
            value={mensagem}
            onChange={(e) => setMensagem(e.target.value)}
            placeholder='Digite sua mensagem*'
          />
        </label>
        {error && (
          <span style={{ color: 'red', fontSize: '0.9em' }}>{error}</span>
        )}
        <div className={styles.formHelp_form_buttons}>
          <button
            type='submit'
            className={styles.formHelp_form_buttons_btn}
            disabled={!name || !email || !phone || !mensagem || loading}
          >
            {loading ? 'Validando...' : 'Enviar'}
          </button>
        </div>

      </form>
    </div>
  )
};

export default FormHelp;
