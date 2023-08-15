use scrypto::prelude::*;

#[derive(ScryptoSbor, NonFungibleData, Debug)]
pub struct SampleNFT {
    pub name: String,
    pub key_image_url: String,
}

#[blueprint]
mod hello_nft {
    struct HelloNFT {
        // Define what resources and data will be managed by Hello components
        sample_vault: Vault,
    }

    impl HelloNFT {
        // Implement the functions and methods which will manage those resources and data

        // This is a function, and can be called directly on the blueprint once deployed
        pub fn instantiate_hello() -> Global<HelloNFT> {
            let sample_bucket = ResourceBuilder::new_integer_non_fungible(OwnerRole::None)
                .metadata(metadata! {
                    init {
                        "name" => "SimpleNFTs", locked;
                        "symbol" => "SNFT", locked;
                        "description" => "These NFTs are for everyone", locked;
                    }
                })
                .mint_initial_supply([
                    (
                        IntegerNonFungibleLocalId::new(1u64),
                        SampleNFT {
                            name: String::from("NFR#1"),
                            key_image_url: String::from("https://gateway.pinata.cloud/ipfs/QmPh2V2C7STFWM7FcHYLzQrtyvzR6caumLQQ7BPMKeG7JT"),                   
                        },
                    ),
                    (
                        IntegerNonFungibleLocalId::new(2u64),
                        SampleNFT {
                            name: String::from("NFR#2"),
                            key_image_url: String::from("https://gateway.pinata.cloud/ipfs/QmPh2V2C7STFWM7FcHYLzQrtyvzR6caumLQQ7BPMKeG7JT"),
                        },
                    ),
                    (
                        IntegerNonFungibleLocalId::new(3u64),
                        SampleNFT {
                            name: String::from("NFR#3"),
                            key_image_url: String::from("https://gateway.pinata.cloud/ipfs/QmPh2V2C7STFWM7FcHYLzQrtyvzR6caumLQQ7BPMKeG7JT"),
                        },
                    ),
                    (
                        IntegerNonFungibleLocalId::new(4u64),
                        SampleNFT {
                            name: String::from("NFR#4"),
                            key_image_url: String::from("https://ipfs.io/ipfs/QmTNQDXdWfbRXPHv9MVbcFippv9FUo7Sk3FsrMBxLfF9LW/4.png"),
                        },
                    ),
                ]);

            let component_address = Self {
                sample_vault: Vault::with_bucket(sample_bucket),
            }
            .instantiate();

            return component_address
                .prepare_to_globalize(OwnerRole::None)
                .globalize();
        }

        // This is a method, because it needs a reference to self.  Methods can only be called on components
        pub fn free_token(&mut self, sample_nfr_id: u64) -> NonFungibleBucket {
           return self.sample_vault
                .as_non_fungible()
                .take_non_fungible(&NonFungibleLocalId::Integer(
                    IntegerNonFungibleLocalId::new(sample_nfr_id),
                ))
        }
    }
}
