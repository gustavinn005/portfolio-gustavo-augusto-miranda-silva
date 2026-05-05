import { View, Text, Pressable, Modal, ScrollView } from 'react-native';
import { ScreenContainer } from '@/components/screen-container';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { useAuth } from '@/lib/auth-context';
import { useCart } from '@/lib/cart-context';
import { FEATURED_PRODUCT } from '@/lib/products';
import * as Haptics from 'expo-haptics';
import { Platform } from 'react-native';

export default function LiveScreen() {
  const router = useRouter();
  const { user } = useAuth();
  const { addItem } = useCart();
  const [showProductModal, setShowProductModal] = useState(false);
  const [roomName, setRoomName] = useState('live-tech');

  const handleBuyNow = () => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    setShowProductModal(true);
  };

  const handleAddToCart = () => {
    if (Platform.OS !== 'web') {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }
    addItem({
      id: FEATURED_PRODUCT.id,
      name: FEATURED_PRODUCT.name,
      price: FEATURED_PRODUCT.price,
      quantity: 1,
      description: FEATURED_PRODUCT.description,
    });
    setShowProductModal(false);
  };

  const handleCloseLive = () => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
    router.back();
  };

  return (
    <ScreenContainer className="bg-black" edges={['top', 'left', 'right', 'bottom']}>
      <View className="flex-1 bg-black relative">
        {/* Jitsi Live Area - Simulated */}
        <View className="flex-1 bg-gray-900 items-center justify-center border-b border-gray-700">
          <View className="items-center gap-4">
            <Text className="text-white text-4xl">📹</Text>
            <Text className="text-white text-lg font-semibold">Transmissão ao Vivo</Text>
            <Text className="text-gray-400 text-sm">Sala: {roomName}</Text>
            <Text className="text-gray-400 text-xs">Participante: {user}</Text>
            <View className="mt-4 bg-green-500 rounded-full px-4 py-2">
              <Text className="text-white text-xs font-bold">🔴 AO VIVO</Text>
            </View>
          </View>
        </View>

        {/* Controls Bar */}
        <View className="bg-gray-800 px-4 py-3 flex-row justify-between items-center border-t border-gray-700">
          <Pressable
            onPress={handleCloseLive}
            style={({ pressed }) => [{ opacity: pressed ? 0.6 : 1 }]}
            className="flex-row items-center gap-2 px-4 py-2 bg-red-600 rounded-lg"
          >
            <Text className="text-white font-semibold">✕ Sair</Text>
          </Pressable>

          <View className="flex-row gap-2">
            <Pressable
              style={({ pressed }) => [{ opacity: pressed ? 0.6 : 1 }]}
              className="px-3 py-2 bg-gray-700 rounded-lg"
            >
              <Text className="text-white text-lg">🔊</Text>
            </Pressable>
            <Pressable
              style={({ pressed }) => [{ opacity: pressed ? 0.6 : 1 }]}
              className="px-3 py-2 bg-gray-700 rounded-lg"
            >
              <Text className="text-white text-lg">📹</Text>
            </Pressable>
          </View>
        </View>

        {/* Buy Now Floating Button */}
        <Pressable
          onPress={handleBuyNow}
          style={({ pressed }) => [
            {
              position: 'absolute',
              bottom: 100,
              right: 20,
              transform: [{ scale: pressed ? 0.95 : 1 }],
              opacity: pressed ? 0.8 : 1,
            },
          ]}
          className="bg-primary rounded-full px-6 py-4 shadow-lg flex-row items-center gap-2"
        >
          <Text className="text-2xl">🛒</Text>
          <Text className="text-white font-bold">Comprar Agora</Text>
        </Pressable>

        {/* Product Modal */}
        <Modal
          visible={showProductModal}
          transparent
          animationType="slide"
          onRequestClose={() => setShowProductModal(false)}
        >
          <View className="flex-1 bg-black/50 justify-end">
            <View className="bg-white rounded-t-3xl p-6 max-h-3/4">
              <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                {/* Close Button */}
                <Pressable
                  onPress={() => setShowProductModal(false)}
                  style={({ pressed }) => [{ opacity: pressed ? 0.6 : 1 }]}
                  className="self-end mb-4"
                >
                  <Text className="text-2xl">✕</Text>
                </Pressable>

                {/* Product Image */}
                <View className="bg-gray-100 rounded-lg p-8 items-center justify-center mb-6">
                  <Text className="text-6xl">📱</Text>
                </View>

                {/* Product Info */}
                <View className="gap-4 mb-6">
                  <View>
                    <Text className="text-sm text-muted mb-1">Produto em Destaque</Text>
                    <Text className="text-2xl font-bold text-foreground">{FEATURED_PRODUCT.name}</Text>
                  </View>

                  <View>
                    <Text className="text-4xl font-bold text-primary">
                      ${FEATURED_PRODUCT.price.toFixed(2)}
                    </Text>
                  </View>

                  <View>
                    <Text className="text-sm text-muted mb-2">Descrição</Text>
                    <Text className="text-base text-foreground leading-relaxed">
                      {FEATURED_PRODUCT.description}
                    </Text>
                  </View>
                </View>

                {/* Add to Cart Button */}
                <Pressable
                  onPress={handleAddToCart}
                  style={({ pressed }) => [
                    {
                      transform: [{ scale: pressed ? 0.98 : 1 }],
                      opacity: pressed ? 0.9 : 1,
                    },
                  ]}
                  className="bg-primary rounded-lg py-4 items-center mb-3"
                >
                  <Text className="text-white font-bold text-lg">Adicionar ao Carrinho</Text>
                </Pressable>

                {/* Continue Watching Button */}
                <Pressable
                  onPress={() => setShowProductModal(false)}
                  style={({ pressed }) => [
                    {
                      transform: [{ scale: pressed ? 0.98 : 1 }],
                      opacity: pressed ? 0.9 : 1,
                    },
                  ]}
                  className="bg-gray-200 rounded-lg py-4 items-center"
                >
                  <Text className="text-foreground font-semibold text-lg">Continuar Assistindo</Text>
                </Pressable>
              </ScrollView>
            </View>
          </View>
        </Modal>
      </View>
    </ScreenContainer>
  );
}
