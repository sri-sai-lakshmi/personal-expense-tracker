import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { ExpenseCategory } from '@/types/expense';

interface CategorySelectorProps {
  categories: ExpenseCategory[];
  selectedCategory: string;
  onCategorySelect: (categoryId: string) => void;
}

export default function CategorySelector({ categories, selectedCategory, onCategorySelect }: CategorySelectorProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Category</Text>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoriesContainer}
      >
        {categories.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={[
              styles.categoryItem,
              selectedCategory === category.name && styles.selectedCategory,
              { borderColor: category.color }
            ]}
            onPress={() => onCategorySelect(category.name)}
            activeOpacity={0.7}
          >
            <View style={[styles.categoryIcon, { backgroundColor: category.color }]}>
              <MaterialIcons 
                name={category.icon as any} 
                size={20} 
                color="white" 
              />
            </View>
            <Text style={[
              styles.categoryText,
              selectedCategory === category.name && styles.selectedCategoryText
            ]}>
              {category.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
    marginLeft: 4,
  },
  categoriesContainer: {
    paddingHorizontal: 4,
  },
  categoryItem: {
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginRight: 12,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'transparent',
    backgroundColor: '#F8F9FA',
    minWidth: 80,
  },
  selectedCategory: {
    backgroundColor: 'white',
    borderWidth: 2,
  },
  categoryIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
  },
  categoryText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    fontWeight: '500',
  },
  selectedCategoryText: {
    color: '#333',
    fontWeight: '600',
  },
});