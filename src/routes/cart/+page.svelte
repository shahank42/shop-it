<script lang="ts">
	import CartCard from '$lib/components/cart-card/cart-card.svelte';
	import MaxWidthWrapper from '$lib/components/max-width-wrapper.svelte';
	import { cart } from '$lib/stores/cartStore';
	import { cn } from '$lib/utils';
	import CartDetails from './cart-details.svelte';
	import { buttonVariants } from '$lib/components/ui/button';
	import { onMount } from 'svelte';

	const { data } = $props();

	onMount(() => {
		if (data.userCartItems.length !== 0) {
			cart.clear();
			for (const item of data.userCartItems) {
				cart.addItem(item);
				cart.setQuantityOf(item.id, item.quantity);
			}
		}
	});
</script>

<section class="w-full bg-background py-8 text-foreground md:py-12">
	<MaxWidthWrapper class="flex flex-col-reverse gap-8 md:grid md:grid-cols-[2fr_1fr]">
		<div class="flex flex-col gap-6">
			<div class="flex flex-col">
				<h1 class="text-3xl font-semibold">My Cart</h1>
				{#if $cart.items.length === 0}
					<p class="">
						Your cart is empty! Looks like it's time to go <a
							href="/"
							class={cn(buttonVariants({ variant: 'link' }), 'px-0')}
						>
							shopping!
						</a>
					</p>
				{/if}
			</div>
			<div class="flex flex-col gap-3">
				{#key $cart.items}
					{#each $cart.items as item}
						<CartCard {item} userId={data.user?.id || null} />
					{/each}
				{/key}
			</div>
		</div>

		<CartDetails />
	</MaxWidthWrapper>
</section>
