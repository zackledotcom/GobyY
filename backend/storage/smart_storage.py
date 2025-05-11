def store(data, location):
	"""
	Stores the given data at the specified location.

	Args:
		data: The data to be stored.
		location: The storage location.
	"""
	with open(location, 'w') as file:
        if isinstance(data, str):
            file.write(data)
        else:
            raise TypeError("Data must be a string")