// HOOK: carrega os horários e entrega só os do dia escolhido, já filtrados por modalidade.
import { useFocusEffect } from 'expo-router';
import { useCallback, useMemo, useState } from 'react';
import { listarHorarios } from '../Services/HorarioService';
import { mensagemDeErro } from '../Utils/erros';

export function useHorarios(dataISO, filtro) {
  const [horarios, setHorarios] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  const carregar = useCallback(async () => {
    try {
      setCarregando(true);
      setErro(null);
      setHorarios(await listarHorarios());
    } catch (e) {
      console.log('Erro ao buscar horários:', e.message, e.config?.url);
      setErro(mensagemDeErro(e, 'Não foi possível carregar os horários.'));
    } finally {
      setCarregando(false);
    }
  }, []);

  // Recarrega sempre que a aba ganha foco (ex.: voltar depois de reservar)
  useFocusEffect(
    useCallback(() => {
      carregar();
    }, [carregar])
  );

  // Chips de filtro vêm do que existe no banco (campo `modalidade` da quadra)
  const modalidades = useMemo(
    () => [...new Set(horarios.map((h) => h.quadra?.modalidade).filter(Boolean))],
    [horarios]
  );

  // TODO: ideal é o back filtrar por data; por ora filtramos aqui
  const doDia = useMemo(
    () =>
      horarios
        .filter((h) => h.data === dataISO)
        .filter((h) => filtro === 'Todas' || h.quadra?.modalidade === filtro)
        .sort(
          (a, b) =>
            a.horaInicio.localeCompare(b.horaInicio) || a.quadra.nome.localeCompare(b.quadra.nome)
        ),
    [horarios, dataISO, filtro]
  );

  return { horarios: doDia, modalidades, carregando, erro, recarregar: carregar };
}
