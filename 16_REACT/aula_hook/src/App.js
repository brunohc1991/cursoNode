import React, { useState, useEffect, useMemo, useCallback } from 'react';

function App() {

  const [tarefas, setTarefas] = useState([]);
  const [novaTarefa, setNovaTarefa] = useState("");

  useEffect(() => {
    const tarefasLocalStorage = localStorage.getItem('tarefas');
    if(tarefasLocalStorage){
      setTarefas(JSON.parse(tarefasLocalStorage));
    }
  },[])

  useEffect(() => {
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
  }, [tarefas]);

  const handleAdd = useCallback(() => {
    setTarefas([...tarefas, novaTarefa]);
    setNovaTarefa("")
  }, [tarefas, novaTarefa])

  const totalTarefas = useMemo(() => tarefas.length, [tarefas]);

  return (
    <div>
      <ul>
        {tarefas.map((tarefa) => (
            <li key={tarefa}>{tarefa}</li>
          ))}
      </ul>
      <br /><strong> Você tem {totalTarefas} tarefas</strong><br />
      <input type="text" value={novaTarefa} onChange={e => setNovaTarefa(e.target.value)}/>
      <button type='button' onClick={handleAdd}>Adicionar</button>
    </div>
  );
}

export default App;
