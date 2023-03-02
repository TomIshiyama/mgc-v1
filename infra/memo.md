## Error launching source instance: InvalidAMIID.NotFound: The image id '[ami-0dfcb1ef8550277af]' does not exist

region に合わせた ami を選ばないといけない。
このエラーは Virginia を選択しており、region は `ap-notheast-1` だったため、そのマシンは存在しないと怒られていた。
