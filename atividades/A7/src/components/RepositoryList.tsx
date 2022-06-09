import { RepositoryItem } from './RepositoryItem.tsx';

import '../styles/repositories.scss';

import { useState, useEffect } from 'react';

interface Repository {
  id: number;
  name: string;
  description: string;
  html_url: string;
}

export function RepositoryList() {
  const [repositories, setRepositories] = useState<Repository[]>([]);

  useEffect(() => {
    fetch('https://api.github.com/users/santicioli/repos')
      .then((response) => response.json())
      .then((data) => setRepositories(data));
  }, []);

  return (
    <section className="repository-list">
      <h1>Lista de repositórios</h1>
      <ul>
        {repositories.map((repo) => {
          return <RepositoryItem repository={repo} key={repo.id} />;
        })}
      </ul>
    </section>
  );
}
