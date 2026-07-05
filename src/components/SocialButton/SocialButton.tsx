import { SocialIcon } from '../Icons/SocialIcons';
import styles from './social-button.module.css';

type SocialButtonProps = {
  href: string;
  label: string;
  icon: 'linkedin' | 'github' | 'mail';
};

export default function SocialButton({ href, label, icon }: SocialButtonProps) {
  const external = href.startsWith('http');

  return (
    <a
      className={styles.button}
      href={href}
      aria-label={label}
      title={label}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      <span className={styles.iconWrap}>
        <SocialIcon name={icon} className={styles.icon} />
      </span>
      <span className={styles.label}>{label}</span>
    </a>
  );
}
