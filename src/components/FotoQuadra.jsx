// COMPONENT: foto da quadra.
// O banco guarda só o nome do arquivo (ex.: "quadra1.jpg"). Se já for uma URL completa,
// usamos como está; senão buscamos em <back-end>/imagens/<arquivo>.
// Se não existir/carregar, mostra um ícone no lugar (a tela nunca quebra).
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Image, View } from 'react-native';
import api from '../Services/api';

export function urlDaFoto(foto) {
  if (!foto) return null;
  if (/^https?:\/\//i.test(foto)) return foto;
  return `${api.defaults.baseURL}/imagens/${foto}`;
}

export function FotoQuadra({ foto, style }) {
  const [falhou, setFalhou] = useState(false);
  const uri = urlDaFoto(foto);

  if (!uri || falhou) {
    return (
      <View style={[style, { backgroundColor: '#D5D5D5', alignItems: 'center', justifyContent: 'center' }]}>
        <Ionicons name="image-outline" size={28} color="#9A9A9A" />
      </View>
    );
  }

  return <Image source={{ uri }} style={style} onError={() => setFalhou(true)} />;
}
