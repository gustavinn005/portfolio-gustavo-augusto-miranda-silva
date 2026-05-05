import { useAuth } from '@/lib/auth-context';
import { Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ScreenContainer } from '@/components/screen-container';
import * as Haptics from 'expo-haptics';
import { Platform } from 'react-native';

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleLogin = async () => {
    setError('');
    if (!username.trim()) {
      setError('Por favor, insira um nome de usuário');
      return;
    }

    setLoading(true);
    try {
      if (Platform.OS !== 'web') {
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      }
      await login(username);
      router.replace('/(tabs)');
    } catch (err) {
      setError('Erro ao fazer login. Tente novamente.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputSubmit = () => {
    handleLogin();
  };

  return (
    <ScreenContainer className="bg-gradient-to-b from-primary to-blue-600" edges={['top', 'left', 'right', 'bottom']}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="flex-1">
        <View className="flex-1 justify-center items-center px-6 gap-8">
          {/* Logo/Header */}
          <View className="items-center gap-2">
            <Text className="text-5xl font-bold text-white">StreamBuy</Text>
            <Text className="text-lg text-white/80">Live Commerce</Text>
          </View>

          {/* Form Card */}
          <View className="w-full bg-white rounded-2xl p-6 shadow-lg gap-4">
            <Text className="text-2xl font-bold text-foreground">Bem-vindo</Text>
            <Text className="text-sm text-muted">Insira seu nome para continuar</Text>

            {/* Username Input */}
            <View className="gap-2">
              <Text className="text-sm font-semibold text-foreground">Nome de Usuário</Text>
              <TextInput
                className="border border-border rounded-lg px-4 py-3 text-base text-foreground bg-surface"
                placeholder="Seu nome"
                placeholderTextColor="#687076"
                value={username}
                onChangeText={(text) => {
                  setUsername(text);
                  setError('');
                }}
                onSubmitEditing={handleInputSubmit}
                returnKeyType="done"
                editable={!loading}
              />
            </View>

            {/* Error Message */}
            {error ? (
              <View className="bg-error/10 border border-error rounded-lg p-3">
                <Text className="text-error text-sm">{error}</Text>
              </View>
            ) : null}

            {/* Login Button */}
            <Pressable
              onPress={handleLogin}
              disabled={loading}
              style={({ pressed }) => [
                {
                  opacity: pressed ? 0.8 : 1,
                  transform: [{ scale: pressed ? 0.98 : 1 }],
                },
              ]}
              className="bg-primary rounded-lg py-4 items-center mt-2"
            >
              <Text className="text-white font-semibold text-base">
                {loading ? 'Entrando...' : 'Entrar'}
              </Text>
            </Pressable>
          </View>

          {/* Info Text */}
          <Text className="text-white/70 text-center text-sm max-w-xs">
            Assista lives ao vivo e compre produtos em tempo real durante as transmissões
          </Text>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
