# dappprofile

# Stacks dapp public web-accessible landing page

Development work by Paradigma SpA co-funded by the Stacks Foundation (https://grants.stacks.org/dashboard/grants/362)

## Introduction

As described in the Stacks documentation (https://docs.stacks.co/docs/build-apps), Apps built with the Stacks blockchain (https://stacks.co) give users control over their digital identities, assets, and data.
Unlike most cloud-based apps, they are "decentralized" since they don't depend on any centralized platform, server, or database to function. Rather, they use the Stacks blockchain to authenticate users and facilitate read and write requests for them without any single point of failure or trust.

Stacks provides three main functions for building apps:

    Authentication: Register and sign users in with identities on the Stacks blockchain (https://stacks.co)
    Transaction signing: Prompt users to sign and broadcast transactions to the Stacks blockchain (https://docs.stacks.co/docs/build-apps/references/authentication)
    Data storage: Save and retrieve data for users with Gaia (https://docs.stacks.co/docs/gaia/)

All three of these integrations can be used together to create powerful new user experiences that rival or exceed those of traditional apps—all while protecting your users' digital rights.

Decentralized Apps (Dapp’s) is the New App that integrates these main functions, authentication, transaction signing, and data storage.  All users, can run their applications under their own private decentralized space as shown in figure 1 Renaissance of the App.  
 
![Figure 1 Renaissance of the App](/dapp_renaissance_of_the_app.png)

The following document is a proposal to establish a standard verifiable decentralized digital identity, starting with the dapp, and app user’s profiles that can be publicly accessed in the Internet by other users using the Stacks Dapp architecture.

## 1.	Definition of a publicly accessible app’s profile and app user’s profile

The integration of authentication, transaction signing, and data storage presents an opportunity to define the profiles for the application itself, each of its users, depending the application to identify its subjects, in a decentralized way using the Internet.  

The W3C (https://www.w3.org) recommends Decentralized identifiers (DIDs), as a new type of identifier that enables verifiable, decentralized digital identity. A DID identifies any subject (e.g., a person, organization, thing, data model, abstract entity, etc.) that the controller of the DID decides to identify. In contrast to typical, federated identifiers, DIDs have been designed so that they may be decoupled from centralized registries, identity providers, and certificate authorities. DIDs are URIs that associate a DID subject with a DID document allowing trustable interactions associated with that subject. Each DID document can express cryptographic material, verification methods, or services, which provide a set of mechanisms enabling a DID controller to prove control of the DID.  

The DIDs for a person for example, are expressed through a name and an image, sometimes a description, background image, etc. The visual and textual representation of an account, helps users to better recognize own accounts and accounts of other users.
Stacks has a long history of Decentralized Identifiers (DIDs) as they introduced human readable names for bitcoin addresses when the project started as “One Name” back in 2014.

The Stacks public DIDs is a profile that is registered with a username on-chain using the BNS (Blockchain Naming System) smart contract. The contract links the STX address and the username according to the rules about fees and expiry.  These profiles are defined using the JSON web token, and its contents using the appropriate objects of the Schema standard (https://schema.org), like the person object (https://schema.org/Person).

There are several services in the Stacks ecosystem where users can claim their Blockchain Domains.  For example, a service that users can claim their Blockchain Domains, and some specific Subdomain Names is found at https://domains.paradigma.global 

### a.	Linking the Internet Domain Names to the Decentralized Identifiers
As previously mentioned above, DIDs are URIs that associate a DID subject with a DID document allowing trustable interactions associated with that subject.

To incentivize mass adoption of DIDs, one initial strategy is to link both Internet Domain Names to DIDs, matching both names. Mixing a centralized domain names with the decentralized domain names. For example, the Internet domain name XCK.app has the same name as the Stacks DID XCK.app, and both are owned by the same controller.  In this case, the controller should be the dapp developer.  

This strategy is ratified by a recent proposal in using a new DID method in conjunction with blockchain-based DIDs that allows them to bootstrap trust using a web domain's existing reputation (https://w3c-ccg.github.io/did-method-web). 

Other future strategies, could be specifying that a DID correspond to a specific Blockchain ecosystem, like Stacks.

#### a.1 The App Profile
The app is identified both by the Internet domain for example 'XCK.app' and the Stacks DID 'XCK.app'  In case, it is a web application, it could be accessed as https://xck.app having both definitions.

The description for a App Profile document is done using a JSON web token based on the WebApplication Schema object (https://schema.org/WebApplication).

Additionally, this document has to include the did-method-web.  The example is represented as 'did:web:xck.app'.  The target system of the Web DID method is the web host that the domain name described by the DID resolves to when queried through the Domain Name System (DNS). This did-method-web is included in this app profile.

It could be useful to have a way to retrieve a verifiable DID profile for the Aspp as recommended by the W3C using an URI. For example, a web URI https://xck.app?profile

In this case, the application should also return a JSON web token using the protocol previously mentioned.

[Example of the WebApplication JSON web token included in the profile for 'XCK.app'](/appprofile/profile.json)

#### a.2 The App did:web DID document
 Creating a DID is done by:
    applying at a domain name registrar for use of a domain name and
    storing the location of a hosting service, the IP address at a DNS lookup service
    creating the DID document JSON-LD file including a suitable keypair, e.g., using the Koblitz Curve, and storing the did.json file under the well-known URL to represent     the entire domain.

For example, for the domain name 'xck.app', the 'did.json' will be available under the following URL: 
'did:web:xck.app'
 -> https://xck.app?did.json

[Example of the 'did.json' file for 'XCK.app'](/appprofile/did.json)

### b.	Expanding the Internet Domain Names to the users Decentralized Identifiers
In this context, the DIDs are URIs that associate a DID subject as a user of the application with a DID document allowing trustable interactions associated with that subject.

#### b.1 The App User's Profile document
The Stacks Blockchain Name System has the possibility to create subdomain names under a define domain name.  A user can claim a subdomain name, having the attribute of a DID.  Using the same example, for the user 'support', the subdomain name is 'support.xck.app'


In this case, the user is identified by this subdomain name, and it could be useful to retrieve a verifiable DID profile for the App User as recommended by the W3C using an URI.  For example, a web URI https://support.xck.app?profile

The description for a App User Profile document is done using a JSON web token based on the Person Schema object (https://schema.org/Person).

Also, this document has to include the did-method-web for the app user.  The example is represented as 'did:web:support.xck.app'.  The target system of the Web DID method is the web host that the domain name described by the DID resolves to when queried through the Domain Name System (DNS). This did-method-web is included in this app user profile.

In this case, the application should also return a JSON web token using the Person Schema object.

[Example of the Person JSON web token included in the profile for support.XCK.app](/userprofile/profile.json)

#### b.2 The App User did:web DID document
 Creating a DID is done by:
    applying at an domain name registrar for use of a domain name and
    storing the location of a hosting service, the IP address at a DNS lookup service
    creating the DID document JSON-LD file including a suitable keypair, e.g., using the Koblitz Curve, and storing the did.json file under the well-known URL to represent     the entire domain.

For example, for the domain name 'support.xck.app', the 'did.json' will be available under the following URL: 
'did:web:support.xck.app'
 -> https://support.xck.app?did.json

[Example of the 'did.json' file for 'support.XCK.app'](/userprofile/did.json)

## 2.	How to set up the domain and subdomain name routing service 

The application has a domain name that targets the services that the users requires.  This functionality probably will be different from a subdomain name that represents the application user.  For this, the proposal considers creating a routing service dependinf of the url that is requested. 

If the request is the application domain name, for example 'XCK.app', it routes to the actual application location.
If the request is for a subdomain name, for example 'support.XCK.app', it routes to the web app user profile page.

This is accomplished using virtual servers.

[Example of the configuration of the domain and subdomain routing service](app/)


## 3.	Procedure to access the public app's data.

In the Stack App Architecture each user identified by a Stacks Account, with or without a domain or subdomain name has an Authentication ID and private Data storage.  The App User Profile service opens the opportunity to share publicly information that the user wants to share.  This information is stored in a decentralizaed way, so the following application is capable to retrieve the profile from the actual data storage associated to the user.

[Example of the application that displays the app user profile in a public form](/app)
