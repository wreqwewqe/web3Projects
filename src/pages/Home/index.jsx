import Guide from '@/components/Guide';
import { trim } from '@/utils/format';

import styles from './index.less';

const HomePage = () => {
  return (
    <div className={styles.container}>
      <Guide name={trim(name)} />
    </div>
  );
};

export default HomePage;
