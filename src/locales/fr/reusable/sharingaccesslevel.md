---
no_index: true
---

**Activé (par défaut)**

Les utilisateurs identifiés (ceux qui ont un [Customer User ID](identifying-users#set-customer-user-id-on-configuration)) peuvent partager le même [niveau d'accès](access-level) fourni par Adapty si leur appareil est connecté au même identifiant Apple/Google. C'est utile quand un utilisateur réinstalle l'application et se connecte avec un autre e-mail — il conserve tout de même l'accès à son achat précédent. Avec cette option, plusieurs utilisateurs identifiés peuvent partager le même niveau d'accès.

Même si le niveau d'accès est partagé, toutes les transactions passées et futures sont enregistrées comme événements dans le Customer User ID d'origine afin de maintenir des analyses cohérentes et conserver un historique de transactions complet — y compris les périodes d'essai, les achats d'abonnement, les renouvellements, etc., liés au même profil.

**Transférer l'accès au nouvel utilisateur**

Les utilisateurs identifiés peuvent continuer à accéder au [niveau d'accès](access-level) fourni par Adapty, même s'ils se connectent avec un [Customer User ID](identifying-users#set-customer-user-id-on-configuration) différent ou réinstallent l'application, tant que l'appareil est connecté au même identifiant Apple/Google.

Contrairement à l'option précédente, Adapty transfère l'achat entre les utilisateurs identifiés. Cela garantit que le contenu acheté est disponible, mais un seul utilisateur peut y avoir accès à la fois. Par exemple, si UserA achète un abonnement et que UserB se connecte sur le même appareil et restaure les transactions, UserB obtient l'accès à l'abonnement, et celui-ci est révoqué pour UserA.

Si l'un des utilisateurs (le nouveau ou l'ancien) n'est pas identifié, le niveau d'accès sera tout de même partagé entre ces profils dans Adapty.

Bien que le niveau d'accès soit transféré, toutes les transactions passées et futures sont enregistrées comme événements dans le Customer User ID d'origine afin de maintenir des analyses cohérentes et conserver un historique de transactions complet — y compris les périodes d'essai, les achats d'abonnement, les renouvellements, etc., liés au même profil.

Après être passé à **Transférer l'accès au nouvel utilisateur**, les niveaux d'accès ne seront pas transférés entre les profils immédiatement. Le processus de transfert pour chaque niveau d'accès spécifique est déclenché uniquement lorsqu'Adapty reçoit un événement du store, comme un renouvellement d'abonnement, une restauration ou lors de la validation d'une transaction.

**Désactivé**

Le premier profil d'utilisateur identifié à obtenir un niveau d'accès le conservera indéfiniment. C'est la meilleure option si votre logique métier exige que les achats soient liés à un seul Customer User ID.

Notez que les niveaux d'accès sont tout de même partagés entre les utilisateurs anonymes.

Vous pouvez « délier » un achat en [supprimant le profil de l'utilisateur propriétaire](https://adapty.io/docs/fr/api-adapty/operations/deleteProfile). Après la suppression, le niveau d'accès devient disponible pour le premier profil utilisateur qui le réclame, qu'il soit anonyme ou identifié.

La désactivation du partage ne concerne que les nouveaux utilisateurs. Les abonnements déjà partagés entre utilisateurs continueront de l'être même après la désactivation de cette option.

:::warning

Apple et Google exigent que les achats intégrés soient partagés ou transférés entre utilisateurs car ils s'appuient sur l'identifiant Apple/Google pour y associer l'achat. Sans partage, la restauration des achats risque de ne pas fonctionner lors des réinstallations ultérieures.

La désactivation du partage peut empêcher les utilisateurs de retrouver l'accès après connexion.

Nous recommandons de désactiver le partage uniquement si vos utilisateurs **sont tenus de se connecter** avant d'effectuer un achat. Dans le cas contraire, un utilisateur identifié pourrait acheter un abonnement, se connecter à un autre compte et perdre définitivement l'accès.
:::

### Quel paramètre choisir ? \{#which-setting-should-i-choose\}

| Mon application...                                           | Option à choisir                                             |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| N'a pas de système de connexion et utilise uniquement les identifiants de profil anonymes d'Adapty. | Utilisez l'option par défaut, car les niveaux d'accès sont toujours partagés entre les identifiants de profil anonymes pour les trois options. |
| Dispose d'un système de connexion optionnel et permet aux clients d'effectuer des achats avant de créer un compte. | Choisissez **Transférer l'accès au nouvel utilisateur** pour garantir que les clients qui achètent sans compte pourront toujours restaurer leurs transactions ultérieurement. |
| Exige que les clients créent un compte avant d'acheter, mais permet de lier les achats à plusieurs Customer User ID. | Choisissez **Transférer l'accès au nouvel utilisateur** pour garantir qu'un seul Customer User ID a accès à la fois, tout en permettant aux utilisateurs de se connecter avec un autre Customer User ID sans perdre leur accès payant. |
| Exige que les clients créent un compte avant d'acheter, avec des règles strictes liant les achats à un seul Customer User ID. | Choisissez **Désactivé** pour garantir que les transactions ne sont jamais transférées entre comptes. |
