package com.example.demo.model;

import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;

@Entity
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String productName;
    private String description;
    private String image;
    private String category;
    private String genre;
    private Double price;
    private Integer salePrice;
    private Integer stock;

    @OneToMany(mappedBy = "product")
    private Set<Review> reviews;

    @JsonIgnore
    @ManyToMany(mappedBy = "favorites", fetch = FetchType.LAZY)
    private Set<UserAccount> userAccount;

    @JsonIgnore
    @ManyToMany(mappedBy = "products", fetch = FetchType.LAZY)
    private Set<UserOrder> userOrders;

    public Product() {
    }

    public Product(Long id, String productName, String description, String category, Double price, Integer salePrice,
            Integer stock, Set<String> reviews, Set<UserAccount> userAccount, Set<UserOrder> userOrders, String image,
            String genre) {
        this.id = id;
        this.productName = productName;
        this.description = description;
        this.category = category;
        this.price = price;
        this.salePrice = salePrice;
        this.stock = stock;
        this.userAccount = userAccount;
        this.userOrders = userOrders;
        this.image = image;
        this.genre = genre;
    }

    public String getGenre() {
        return genre;
    }

    public void setGenre(String genre) {
        this.genre = genre;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public Integer getSalePrice() {
        return salePrice;
    }

    public void setSalePrice(Integer salePrice) {
        this.salePrice = salePrice;
    }

    public int getStock() {
        return stock;
    }

    public void setStock(int stock) {
        this.stock = stock;
    }

    public Set<Review> getReviews() {
        return reviews;
    }

    public void setReviews(Set<Review> reviews) {
        this.reviews = reviews;
    }

    public Set<UserOrder> getUserOrders() {
        return userOrders;
    }

    public void setUserOrders(Set<UserOrder> userOrders) {
        this.userOrders = userOrders;
    }

}
