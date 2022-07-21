# dappprofile

# Stacks dapp public web-accessible landing page

Development work by Paradigma SpA co-funded by the Stacks Foundation (https://grants.stacks.org/dashboard/grants/362)

## Introduction

As described in the Stacks documentation (https://docs.stacks.co/docs/build-apps), > Apps built with the Stacks blockchain (https://stacks.co) give users control over their digital identities, assets, and data.
Unlike most cloud-based apps, they are "decentralized" since they don't depend on any centralized platform, server, or database to function. Rather, they use the Stacks blockchain to authenticate users and facilitate read and write requests for them without any single point of failure or trust.

Stacks provides three main functions for building apps:
    Authentication: Register and sign users in with identities on the Stacks blockchain
    Transaction signing: Prompt users to sign and broadcast transactions to the Stacks blockchain
    Data storage: Save and retrieve data for users with Gaia

All three of these integrations can be used together to create powerful new user experiences that rival or exceed those of traditional apps—all while protecting your users' digital rights.

Decentralized Apps (Dapp’s) is the New App that integrates these main functions, authentication, transaction signing, and data storage.  All users, can run their applications under their own private decentralized space as shown in figure 1.  
 
Figure 1 Renaissance of the App

The following document is a proposal to establish a standard verifiable decentralized digital identity, starting with the dapp, and app user’s profiles that can be publicly accessed in the Internet by other users using the Stacks Dapp architecture.

## 1.	Definition of a publicly accessible dapp’s profile and user’s profile

The integration of authentication, transaction signing, and data storage presents an opportunity to define the profiles for the application itself, each of its users, depending the application to identify its subjects, in a decentralized way using the Internet.  

The W3C (https://www.w3.org) recommends Decentralized identifiers (DIDs), as a new type of identifier that enables verifiable, decentralized digital identity. A DID identifies any subject (e.g., a person, organization, thing, data model, abstract entity, etc.) that the controller of the DID decides to identify. In contrast to typical, federated identifiers, DIDs have been designed so that they may be decoupled from centralized registries, identity providers, and certificate authorities. DIDs are URIs that associate a DID subject with a DID document allowing trustable interactions associated with that subject. Each DID document can express cryptographic material, verification methods, or services, which provide a set of mechanisms enabling a DID controller to prove control of the DID.  

The DIDs for a person for example, are expressed through a name and an image, sometimes a description, background image, etc. The visual and textual representation of an account, helps users to better recognize own accounts and accounts of other users.
Stacks has a long history of Decentralized Identifiers (DIDs) as they introduced human readable names for bitcoin addresses when the project started as “One Name” back in 2014.

The Stacks public DIDs is a profile that is registered with a username on-chain using the BNS (Blockchain Naming System) smart contract. The contract links the STX address and the username according to the rules about fees and expiry.  These profiles are defined using the JSON web token, and its contents using the appropriate objects of the Schema standard (https://schema.org), like the person object (https://schema.org/Person).

There are several services in the Stacks ecosystem where users can claim their Blockchain Domains.  For example, a service that users can claim their Blockchain Domains, and some specific Subdomain Names is found at https://domains.paradigma.global 

### a.	Linking the Internet Domain Names to the Decentralized Identifiers
As previously mentioned above, DIDs are URIs that associate a DID subject with a DID document allowing trustable interactions associated with that subject.

One initial strategy is to link both Internet Domain Names to DIDs, matching both names. Mixing a centralized domain names with the decentralized domain names. For example, the Internet domain name XCK.app has the same name as the Stacks DID XCK.app, and both are owned by the same controller.  In this case, the controller should be the dapp developer.  

Other future strategies, could be specifying that a DID correspond to a specific Blockchain ecosystem, like Stacks.

The app is identified both by the Internet domain for example XCK.app and the Stacks DID XCK.app  In case, it is a web application, it could be accessed as https://xck.app having both definitions.
It could be useful to have a way to retrieve a verifiable DID profile for the Dapp as recommended by the W3C using an URI. For example, a web URI https://xck.app/profile

In this case, the application should also return a JSON web token using the WebApplication Schema object (https://schema.org/WebApplication).
Example of the WebApplication JSON web token included in the profile for XCK.app

### b.	Expanding the Internet Domain Names to the users Decentralized Identifiers
The Stacks Blockchain Name System has the possibility to create subdomain names under a define domain name.  A user can claim a subdomain name, having the attribute of a DID.  Using the same example, for the user support, support.xck.app

In this case, the user is identified by this subdomain name, and it could be useful to retrieve a verifiable DID profile for the User Dapp as recommended by the W3C using an URI.  For example, a web URI https://support.xck.app/profile

In this case, the application should also return a JSON web token using the Person Schema object (https://schema.org/Person).
Example of the Person JSON web token included in the profile for support.XCK.app
