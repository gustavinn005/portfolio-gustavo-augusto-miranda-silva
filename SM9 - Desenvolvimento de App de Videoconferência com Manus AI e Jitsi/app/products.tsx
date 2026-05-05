import { FlatList, Pressable, Text, View } from 'react-native';
import { ScreenContainer } from '@/components/screen-container';
import { useRouter } from 'expo-router';
import { PRODUCTS } from '@/lib/products';
import { useCart } from '@/lib/cart-context';
import * as Haptics from 'expo-haptics';
import { Platform } from 'react-native';

export default function ProductsScreen() {
  const router = useRouter();
  const { addItem } = useCart();

  const handleBuyProduct = (productId: string) => {
    const product = PRODUCTS.find((p) => p.id === productId);
    if (!product) return;

    if (Platform.OS !== 'web') {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }

    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      description: product.description,
    });
  };

  const handleBack = () => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    router.back();
  };

  const renderProduct = ({ item }: { item: (typeof PRODUCTS)[0] }) => (
    <View className="flex-1 m-2 bg-white rounded-xl overflow-hidden border border-border">
      {/* Product Image */}
      <View className="bg-gray-100 h-32 items-center justify-center">
        <Text className="text-5xl">📦</Text>
      </View>

      {/* Product Info */}
      <View className="p-3 gap-2 flex-1">
        <Text className="text-sm font-semibold text-foreground" numberOfLines={2}>
          {item.name}
        </Text>
        <Text className="text-xs text-muted" numberOfLines={1}>
          {item.category}
        </Text>
        <Text className="text-lg font-bold text-primary mt-1">
          ${item.price.toFixed(2)}
        </Text>
      </View>

      {/* Buy Button */}
      <Pressable
        onPress={() => handleBuyProduct(item.id)}
        style={({ pressed }) => [
          {
            transform: [{ scale: pressed ? 0.98 : 1 }],
            opacity: pressed ? 0.9 : 1,
          },
        ]}
        className="bg-primary m-2 rounded-lg py-2 items-center"
      >
        <Text className="text-white font-semibold text-sm">Comprar</Text>
      </Pressable>
    </View>
  );

  return (
    <ScreenContainer className="bg-white">
      <View className="flex-1 gap-0">
        {/* Header */}
        <View className="px-6 py-4 border-b border-border flex-row items-center justify-between">
          <View className="flex-1">
            <Text className="text-2xl font-bold text-foreground">Produtos</Text>
            <Text className="text-sm text-muted">{PRODUCTS.length} itens disponíveis</Text>
          </View>
          <Pressable
            onPress={handleBack}
            style={({ pressed }) => [{ opacity: pressed ? 0.6 : 1 }]}
            className="px-4 py-2"
          >
            <Text className="text-primary font-semibold">← Voltar</Text>
          </Pressable>
        </View>

        {/* Products Grid */}
        <FlatList
          data={PRODUCTS}
          renderItem={renderProduct}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={{ flex: 1 }}
          contentContainerStyle={{ paddingVertical: 8 }}
          scrollEnabled={true}
        />
      </View>
    </ScreenContainer>
  );
}
